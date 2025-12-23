import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Building2, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface PublicProvider {
  id: string;
  provider_id: string;
  practice_id: string;
  full_name: string;
  title: string;
  contact_email: string;
  contact_phone: string;
  business_location: string;
  city: string;
  state: string;
  practice_name: string;
}

interface ReferringProviderSelectorProps {
  onSelect: (provider: PublicProvider | null, isManual: boolean) => void;
  selectedProviderId?: string | null;
}

const ReferringProviderSelector: React.FC<ReferringProviderSelectorProps> = ({
  onSelect,
  selectedProviderId,
}) => {
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState<PublicProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(selectedProviderId || '');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the existing external edge function
      const response = await fetch(
        'https://epkypzawqtpokmatjuzo.supabase.co/functions/v1/get-public-provider-profiles',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }

      const data = await response.json();
      // Map external response to our interface - API returns array directly
      const mappedProviders = (Array.isArray(data) ? data : []).map((p: any) => ({
        id: p.id,
        provider_id: p.provider_id,
        practice_id: p.practice_id,
        full_name: p.full_name || '',
        title: p.title || '',
        contact_email: p.contact_email || '',
        contact_phone: p.contact_phone || '',
        business_location: p.business_location || '',
        city: p.city || '',
        state: p.state || '',
        practice_name: p.practice_name || p.business_location || 'Unknown Practice',
      }));
      
      // Debug: Print all practices to console
      console.log('=== PRACTICES LIST ===');
      console.log(`Total providers: ${mappedProviders.length}`);
      mappedProviders.forEach((p, index) => {
        console.log(`${index + 1}. ${p.practice_name} - ${p.full_name} (${p.city}, ${p.state})`);
      });
      console.log('=== END PRACTICES LIST ===');
      
      setProviders(mappedProviders);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError('Unable to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setOpen(false);

    if (value === 'other') {
      onSelect(null, true);
    } else {
      const provider = providers.find((p) => p.id === value);
      if (provider) {
        onSelect(provider, false);
      }
    }
  };

  const getDisplayText = () => {
    if (selectedValue === 'other') {
      return 'Other (Enter Manually)';
    }
    const provider = providers.find((p) => p.id === selectedValue);
    if (provider) {
      return `${provider.practice_name} - ${provider.full_name}`;
    }
    return 'Select a dental practice...';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 py-2 text-left font-normal"
          disabled={loading}
        >
          <span className="truncate">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading providers...
              </span>
            ) : (
              getDisplayText()
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border border-border shadow-lg z-50" 
        align="start"
      >
        <Command className="bg-background">
          <CommandInput placeholder="Search practices..." className="h-9" />
          <CommandList className="max-h-[300px]">
            {error ? (
              <div className="p-4 text-center text-sm text-destructive">{error}</div>
            ) : (
              <>
                <CommandEmpty>No practice found.</CommandEmpty>
                <CommandGroup>
                  {/* Other option always first */}
                  <CommandItem
                    value="other"
                    onSelect={() => handleSelect('other')}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Other (Enter Manually)</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedValue === 'other' ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                  
                  {/* Provider list */}
                  {providers.map((provider) => (
                    <CommandItem
                      key={provider.id}
                      value={`${provider.practice_name} ${provider.full_name} ${provider.city}`}
                      onSelect={() => handleSelect(provider.id)}
                      className="cursor-pointer"
                    >
                      <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-medium">{provider.practice_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {provider.full_name}{provider.city ? ` • ${provider.city}, ${provider.state}` : ''}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedValue === provider.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ReferringProviderSelector;

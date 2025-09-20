import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getActiveProviders, PublicProviderProfile } from '@/lib/supabase';
import { Loader } from '@googlemaps/js-api-loader';
import { toast } from '@/hooks/use-toast';

export const ProviderSearch = () => {
  const [providers, setProviders] = useState<PublicProviderProfile[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<PublicProviderProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<PublicProviderProfile | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Google Maps API Key - Note: You'll need to provide this
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  useEffect(() => {
    loadProviders();
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [providers, searchTerm, locationSearch]);

  const loadGoogleMaps = async () => {
    if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
      toast({
        title: "Google Maps API Key Required",
        description: "Please add your Google Maps API key to enable map functionality.",
        variant: "destructive"
      });
      return;
    }

    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();
      setGoogleMapsLoaded(true);
      initializeMap();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      toast({
        title: "Maps Loading Error",
        description: "Failed to load Google Maps. Please check your API key.",
        variant: "destructive"
      });
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !googleMapsLoaded) return;

    mapInstance.current = new (window as any).google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center of US
      zoom: 4,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });
  };

  const loadProviders = async () => {
    setLoading(true);
    try {
      const data = await getActiveProviders();
      setProviders(data);
      setFilteredProviders(data);
    } catch (error) {
      console.error('Error loading providers:', error);
      toast({
        title: "Error",
        description: "Failed to load providers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers;

    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.practice_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationSearch) {
      filtered = filtered.filter(provider =>
        provider.city?.toLowerCase().includes(locationSearch.toLowerCase()) ||
        provider.state?.toLowerCase().includes(locationSearch.toLowerCase()) ||
        provider.address?.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  };

  const ProviderModal = ({ provider }: { provider: PublicProviderProfile }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Dr. {provider.first_name} {provider.last_name}
        </DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {provider.profile_photo_url && (
            <img
              src={provider.profile_photo_url}
              alt={`Dr. ${provider.first_name} ${provider.last_name}`}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
            />
          )}
          <div>
            <h3 className="font-semibold text-lg mb-2">Practice Information</h3>
            <p className="text-muted-foreground mb-1">{provider.practice_name}</p>
            <p className="text-muted-foreground mb-1">{provider.city}, {provider.state}</p>
            {provider.phone && (
              <p className="text-muted-foreground flex items-center gap-2">
                <Phone size={16} />
                {provider.phone}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {provider.specialties && provider.specialties.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {provider.bio && (
            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-muted-foreground">{provider.bio}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Ready to Get Started?</h3>
        <p className="text-muted-foreground mb-4">
          Understand your potential treatment costs and financing options
        </p>
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => window.open('https://dental-docs-hub.lovable.app/signup', '_blank')}
        >
          Get Started
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <AnimatedText className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find a Provider Near You
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Search our network of over 1,200 DentiPay-enabled dental practices
            </p>
          </AnimatedText>

          {/* Search Filters */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search by provider name or practice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Enter city, state, or zip code..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Google Map */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card>
              <CardContent className="p-0">
                <div
                  ref={mapRef}
                  className="w-full h-96 rounded-lg bg-muted flex items-center justify-center"
                >
                  {!googleMapsLoaded && (
                    <div className="text-center text-muted-foreground">
                      <MapPin size={48} className="mx-auto mb-4" />
                      <p>Loading Google Maps...</p>
                      <p className="text-sm mt-2">
                        Note: Google Maps API key required for full functionality
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provider Results */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {loading ? 'Loading...' : `${filteredProviders.length} Providers Found`}
            </h2>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      {provider.profile_photo_url ? (
                        <img
                          src={provider.profile_photo_url}
                          alt={`Dr. ${provider.first_name} ${provider.last_name}`}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <User size={32} className="text-muted-foreground" />
                        </div>
                      )}
                      <h3 className="font-semibold text-lg">
                        Dr. {provider.first_name} {provider.last_name}
                      </h3>
                      <p className="text-muted-foreground">{provider.practice_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {provider.city}, {provider.state}
                      </p>
                    </div>

                    {provider.specialties && provider.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {provider.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {provider.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {provider.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {provider.bio}
                      </p>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" onClick={() => setSelectedProvider(provider)}>
                          Get Treatment
                        </Button>
                      </DialogTrigger>
                      {selectedProvider && <ProviderModal provider={selectedProvider} />}
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredProviders.length === 0 && (
            <div className="text-center py-16">
              <MapPin size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or location
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
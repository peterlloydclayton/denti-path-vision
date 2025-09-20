import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Phone, User, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getActiveProviders, PublicProviderProfile, supabase } from '@/lib/supabase';
import { Loader } from '@googlemaps/js-api-loader';
import { toast } from '@/hooks/use-toast';

interface ProviderWithDistance extends PublicProviderProfile {
  distance?: number;
  coordinates?: { lat: number; lng: number };
}

export const ProviderSearch = () => {
  const [providers, setProviders] = useState<ProviderWithDistance[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ProviderWithDistance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [radiusFilter, setRadiusFilter] = useState<string>('25');
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<PublicProviderProfile | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('');

  useEffect(() => {
    loadGoogleMapsApiKey();
    loadProviders();
  }, []);

  useEffect(() => {
    if (googleMapsApiKey) {
      loadGoogleMaps();
    }
  }, [googleMapsApiKey]);

  useEffect(() => {
    filterProviders();
  }, [providers, searchTerm, locationSearch, userLocation, radiusFilter]);

  const loadGoogleMapsApiKey = async () => {
    // Using the provided Google Maps API key directly
    setGoogleMapsApiKey('AIzaSyB_qpGxmxtx7N1CBayqG3-gUoYVLPqOVjI');
  };

  const loadGoogleMaps = async () => {
    if (!googleMapsApiKey) {
      toast({
        title: "Google Maps API Key Required",
        description: "Please configure your Google Maps API key in Supabase secrets.",
        variant: "destructive"
      });
      return;
    }

    try {
      const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: 'weekly',
        libraries: ['places', 'geometry']
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

    // Initialize Places Autocomplete for location search (using modern API)
    const locationInput = document.getElementById('location-search') as HTMLInputElement;
    if (locationInput && (window as any).google?.maps?.places?.PlaceAutocompleteElement) {
      try {
        const autocompleteElement = new (window as any).google.maps.places.PlaceAutocompleteElement();
        autocompleteElement.addEventListener('gmp-placeselect', (event: any) => {
          const place = event.place;
          if (place.location) {
            const location = {
              lat: place.location.lat(),
              lng: place.location.lng()
            };
            setUserLocation(location);
            mapInstance.current?.setCenter(location);
            mapInstance.current?.setZoom(12);
          }
        });
        locationInput.parentNode?.appendChild(autocompleteElement);
      } catch (error) {
        // Fallback to legacy Autocomplete if new API fails
        console.warn('Using legacy Autocomplete API');
        const autocomplete = new (window as any).google.maps.places.Autocomplete(locationInput);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };
            setUserLocation(location);
            mapInstance.current?.setCenter(location);
            mapInstance.current?.setZoom(12);
          }
        });
      }
    }
  };

  const loadProviders = async () => {
    setLoading(true);
    try {
      const data = await getActiveProviders();
      // Geocode provider addresses using proper location data
      const providersWithCoords = await Promise.all(
        data.map(async (provider) => {
          const fullAddress = getAddressForGeocoding(provider);
          const coordinates = fullAddress ? await geocodeAddress(fullAddress) : null;
          return { ...provider, coordinates };
        })
      );
      setProviders(providersWithCoords);
      setFilteredProviders(providersWithCoords);
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

  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    if (!googleMapsLoaded || !address) return null;
    
    try {
      const geocoder = new (window as any).google.maps.Geocoder();
      const result = await new Promise((resolve) => {
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === 'OK' && results[0]) {
            resolve({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            });
          } else {
            resolve(null);
          }
        });
      });
      return result as { lat: number; lng: number } | null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number => {
    if (!googleMapsLoaded) return 0;
    
    const distance = (window as any).google.maps.geometry.spherical.computeDistanceBetween(
      new (window as any).google.maps.LatLng(coord1.lat, coord1.lng),
      new (window as any).google.maps.LatLng(coord2.lat, coord2.lng)
    );
    
    // Convert meters to miles
    return Math.round((distance * 0.000621371) * 10) / 10;
  };

  const getLocationDisplay = (provider: ProviderWithDistance) => {
    // Priority: location.city/state, then direct city/state, then business_location as fallback
    const locationCity = provider.location?.city || provider.city;
    const locationState = provider.location?.state || provider.state;
    
    if (locationCity && locationState) {
      return `${locationCity}, ${locationState}`;
    } else if (locationCity) {
      return locationCity;
    } else if (provider.business_location) {
      return provider.business_location;
    }
    return 'Location not specified';
  };

  const getAddressForGeocoding = (provider: PublicProviderProfile) => {
    // Use location data if available, otherwise fall back to direct fields
    const city = provider.location?.city || provider.city;
    const state = provider.location?.state || provider.state;
    const address = provider.location?.address || provider.address || provider.business_location;
    
    if (city && state) {
      return address ? `${address}, ${city}, ${state}` : `${city}, ${state}`;
    }
    return address || '';
  };

  const filterProviders = useCallback(() => {
    let filtered = [...providers];

    // Text-based filtering
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.practice_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.business_location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location-based filtering
    if (locationSearch && !userLocation) {
      filtered = filtered.filter(provider => {
        const locationCity = provider.location?.city || provider.city;
        const locationState = provider.location?.state || provider.state;
        const locationAddress = provider.location?.address || provider.address;
        
        return locationCity?.toLowerCase().includes(locationSearch.toLowerCase()) ||
               locationState?.toLowerCase().includes(locationSearch.toLowerCase()) ||
               locationAddress?.toLowerCase().includes(locationSearch.toLowerCase()) ||
               provider.business_location?.toLowerCase().includes(locationSearch.toLowerCase());
      });
    }

    // Radius filtering when user location is available
    if (userLocation && radiusFilter) {
      const maxDistance = parseInt(radiusFilter);
      filtered = filtered.filter(provider => {
        if (!provider.coordinates) return false;
        const distance = calculateDistance(userLocation, provider.coordinates);
        provider.distance = distance;
        return distance <= maxDistance;
      });
    }

    // Sort by distance if available
    if (userLocation) {
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setFilteredProviders(filtered);
    updateMapMarkers(filtered);
  }, [providers, searchTerm, locationSearch, userLocation, radiusFilter, googleMapsLoaded]);

  const updateMapMarkers = (providersToShow: ProviderWithDistance[]) => {
    if (!mapInstance.current || !googleMapsLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    const bounds = new (window as any).google.maps.LatLngBounds();
    let hasValidCoordinates = false;

    providersToShow.forEach(provider => {
      if (provider.coordinates) {
        const marker = new (window as any).google.maps.Marker({
          position: provider.coordinates,
          map: mapInstance.current,
          title: `Dr. ${provider.first_name} ${provider.last_name}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15" fill="#2563eb" stroke="white" stroke-width="2"/>
                <path fill="white" d="M16 8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4zm0 6c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z"/>
                <path fill="white" d="M16 18c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            `),
            scaledSize: new (window as any).google.maps.Size(32, 32)
          }
        });

        const displayName = provider.full_name || `Dr. ${provider.first_name || ''} ${provider.last_name || ''}`.trim();
        const locationText = getLocationDisplay(provider);

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold;">${displayName}</h3>
              <p style="margin: 0; color: #666;">${provider.practice_name || provider.business_location || ''}</p>
              <p style="margin: 4px 0 0 0; color: #666;">${locationText}</p>
              ${provider.distance ? `<p style="margin: 4px 0 0 0; color: #666;">${provider.distance} miles away</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance.current, marker);
        });

        markersRef.current.push(marker);
        bounds.extend(marker.getPosition());
        hasValidCoordinates = true;
      }
    });

    // Fit map to show all markers
    if (hasValidCoordinates) {
      mapInstance.current.fitBounds(bounds);
      const zoom = mapInstance.current.getZoom();
      if (zoom > 15) {
        mapInstance.current.setZoom(15);
      }
    }
  };

  const ProviderModal = ({ provider }: { provider: PublicProviderProfile }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {provider.full_name || `Dr. ${provider.first_name || ''} ${provider.last_name || ''}`.trim()}
        </DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {(provider.profile_photo_url || provider.photo_url) && (
            <img
              src={provider.profile_photo_url || provider.photo_url}
              alt={provider.full_name || `Dr. ${provider.first_name} ${provider.last_name}`}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
            />
          )}
          <div>
            <h3 className="font-semibold text-lg mb-2">Practice Information</h3>
            <p className="text-muted-foreground mb-1">{provider.practice_name || provider.business_location}</p>
            <p className="text-muted-foreground mb-1">
              {getLocationDisplay(provider)}
            </p>
            {(provider.phone || provider.contact_phone) && (
              <p className="text-muted-foreground flex items-center gap-2">
                <Phone size={16} />
                {provider.phone || provider.contact_phone}
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
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
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
                  id="location-search"
                  placeholder="Enter city, state, or zip code..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Select value={radiusFilter} onValueChange={setRadiusFilter}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                    <SelectItem value="100">Within 100 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {userLocation && (
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  <MapPin size={14} className="mr-1" />
                  Showing providers near your selected location
                </Badge>
              </div>
            )}
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
                      {(provider.profile_photo_url || provider.photo_url) ? (
                        <img
                          src={provider.profile_photo_url || provider.photo_url}
                          alt={provider.full_name || `Dr. ${provider.first_name} ${provider.last_name}`}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <User size={32} className="text-muted-foreground" />
                        </div>
                      )}
                      <h3 className="font-semibold text-lg">
                        {provider.full_name || `Dr. ${provider.first_name || ''} ${provider.last_name || ''}`.trim()}
                      </h3>
                      <p className="text-muted-foreground">{provider.practice_name || provider.business_location}</p>
                      <p className="text-sm text-muted-foreground">
                        {getLocationDisplay(provider)}
                      </p>
                      {provider.distance && (
                        <p className="text-sm text-primary font-medium">
                          {provider.distance} miles away
                        </p>
                      )}
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
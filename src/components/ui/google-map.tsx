import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface GoogleMapRef {
  addMarkers: (providers: any[]) => void;
  clearMarkers: () => void;
  fitBounds: (bounds: any) => void;
}

interface GoogleMapProps {
  onMapReady?: (map: any) => void;
  className?: string;
}

export const GoogleMap = forwardRef<GoogleMapRef, GoogleMapProps>(({ onMapReady, className }, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const isDestroyedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    addMarkers: (providers: any[]) => {
      if (!mapRef.current || isDestroyedRef.current) return;
      
      // Clear existing markers safely
      markersRef.current.forEach(marker => {
        try {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      markersRef.current = [];

      // Close info window
      if (infoWindowRef.current) {
        try {
          infoWindowRef.current.close();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      // Add new markers
      const bounds = new (window as any).google.maps.LatLngBounds();
      let hasMarkers = false;

      providers.forEach(provider => {
        if (provider.coordinates && !isDestroyedRef.current) {
          try {
            const marker = new (window as any).google.maps.Marker({
              position: provider.coordinates,
              map: mapRef.current,
              title: provider.full_name || `Dr. ${provider.first_name} ${provider.last_name}`
            });

            const infoWindow = new (window as any).google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; min-width: 200px;">
                  <h3 style="margin: 0 0 4px 0; font-weight: bold;">
                    ${provider.full_name || `Dr. ${provider.first_name} ${provider.last_name}`}
                  </h3>
                  <p style="margin: 0; color: #666;">${provider.practice_name || provider.business_location || ''}</p>
                </div>
              `
            });

            marker.addListener('click', () => {
              if (isDestroyedRef.current) return;
              
              if (infoWindowRef.current) {
                try {
                  infoWindowRef.current.close();
                } catch (e) {
                  // Ignore errors
                }
              }
              
              infoWindow.open(mapRef.current, marker);
              infoWindowRef.current = infoWindow;
            });

            markersRef.current.push(marker);
            bounds.extend(marker.getPosition());
            hasMarkers = true;
          } catch (e) {
            console.warn('Error creating marker:', e);
          }
        }
      });

      if (hasMarkers && !isDestroyedRef.current) {
        try {
          mapRef.current.fitBounds(bounds);
          const zoom = mapRef.current.getZoom();
          if (zoom > 15) {
            mapRef.current.setZoom(15);
          }
        } catch (e) {
          console.warn('Error fitting bounds:', e);
        }
      }
    },

    clearMarkers: () => {
      markersRef.current.forEach(marker => {
        try {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      markersRef.current = [];
    },

    fitBounds: (bounds: any) => {
      if (mapRef.current && !isDestroyedRef.current) {
        try {
          mapRef.current.fitBounds(bounds);
        } catch (e) {
          console.warn('Error fitting bounds:', e);
        }
      }
    }
  }));

  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainerRef.current || isDestroyedRef.current) return;

      if (!(window as any).google?.maps) {
        setTimeout(initializeMap, 100);
        return;
      }

      try {
        // Create a new div inside the container to isolate from React
        const mapDiv = document.createElement('div');
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        mapDiv.style.borderRadius = '8px';
        
        if (mapContainerRef.current.firstChild) {
          mapContainerRef.current.removeChild(mapContainerRef.current.firstChild);
        }
        mapContainerRef.current.appendChild(mapDiv);

        mapRef.current = new (window as any).google.maps.Map(mapDiv, {
          center: { lat: 39.8283, lng: -98.5795 },
          zoom: 4,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        if (onMapReady) {
          onMapReady(mapRef.current);
        }

        // Map initialized successfully
      } catch (error) {
        // Error initializing map
      }
    };

    initializeMap();

    return () => {
      isDestroyedRef.current = true;
      
      // Clear markers
      markersRef.current.forEach(marker => {
        try {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      });
      markersRef.current = [];

      // Close info window
      if (infoWindowRef.current) {
        try {
          infoWindowRef.current.close();
        } catch (e) {
          // Ignore cleanup errors
        }
      }

      // Clear map reference
      mapRef.current = null;

      // Clear container safely
      if (mapContainerRef.current) {
        try {
          // Let the browser handle cleanup naturally
          mapContainerRef.current.innerHTML = '';
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [onMapReady]);

  return (
    <div
      ref={mapContainerRef}
      className={className}
      style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '8px',
        backgroundColor: '#f3f4f6'
      }}
    />
  );
});

GoogleMap.displayName = 'GoogleMap';
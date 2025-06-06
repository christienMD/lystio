

interface Location {
    type?: string;
    coordinates?: [number, number];
  }
export interface Listing {
    id: number;
    title: string;
    abstract?: string;
    address: string;
    addressDoor?: string;
    addressStair?: string;
    zip: string;
    city: string;
    country: string;
    rooms: number;
    roomsBed: number;
    roomsBath: number;
    roomHeight?: number;
    size: number;
    sizeProperty?: number;
    sizeNet?: number;
    rent: number;
    rentPerFrom?: number;
    rentPerTo?: number;
    rentUtilities: number;
    rentFull?: number;
    rentDeposit: number;
    rentComission: number;
    amenities?: number[];
    location?: Location | null;
    locationIsExact?: boolean;
    locationRadius?: number;
    createdAt: string;
    updatedAt: string;
    type?: number;
    subType?: number;
    condition?: number;
    accessibility?: number;
    unitType: string;
    rentType: string;
    pets?: string[];
    floorType?: number;
    heatingSource?: number;
    heatingDistribution?: number;
    leaseDuration?: number;
    availableFrom?: string;
    availableFromText?: string;
    highlight?: boolean;
    active: boolean;
    listed: boolean;
    verified: boolean;
    constructionYear?: number;
    modernisationYear?: number;
    floor?: string;
    readiness?: number;
    tier?: number;
    furnish?: number;
    countBuildings?: number;
    countUnits?: number;
    rentDurationMin?: number;
    rentDurationMax?: number;
    status: string;
    _filterBoundary?: string[];
    priceOnRequest?: boolean;
    spaces?: any;
    floors?: any;
    energy?: any;
    style?: string;
    allowAppointments?: boolean;
    reservedUntil?: string;
    requestLimit?: number;
    lastUpdated?: string;
    media: {
      type: string;
      name?: string;
      cdnUrl: string;
      cdnUrlStaged?: string;
      cdnUrlPreview?: string;
      sort?: number;
      sortRaw?: number;
      title?: string;
      bluredDataURL?: string;
      category?: string;
      cat?: string;
      importHash?: string;
      isTitle?: boolean;
      statusMessage?: string;
      id: number;
    }[];
    tenements?: any[];
    tenementCount?: number;
    isFavorite?: boolean;
    sizeRange?: number[];
    rentRange?: number[];
    rentPerRange?: number[];
    roomsRange?: number[];
    roomsBathRange?: number[];
    roomsBedRange?: number[];
    rentPer?: any[];
    tags?: string[];
    addons?: string[];
    requests?: any;
    owner?: {
      country?: string;
      name?: string;
      email?: string;
      phone?: string;
      description?: string;
      vat?: string;
      billingAddress?: string;
      address?: string;
      imageUrl?: string;
      website?: string;
      countProperties?: number;
      createdAt?: string;
    };
    user?: {
      externalId?: string;
      company?: any;
      firstName?: string;
      lastName?: string;
      email?: string;
      contactEmail?: string;
      createdAt?: string;
      imageUrl?: string;
      subtype?: string;
      phone?: string;
      country?: string;
      address?: string;
      propertyCount?: number;
      languages?: string[];
    };
  }
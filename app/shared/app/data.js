export const provinces = [
  { id: 'ab', name: 'Alberta' },
  { id: 'bc', name: 'British Columbia' },
  { id: 'mb', name: 'Manitoba' },
  { id: 'nb', name: 'New Brunswick' },
  { id: 'nl', name: 'Newfoundland & Labrador' },
  { id: 'nt', name: 'Northwest Territories' },
  { id: 'ns', name: 'Nova Scotia' },
  { id: 'nu', name: 'Nunavut' },
  { id: 'on', name: 'Ontario' },
  { id: 'pe', name: 'Prince Edward Island' },
  { id: 'qc', name: 'Quebec' },
  { id: 'sk', name: 'Saskatchewan' },
  { id: 'yt', name: 'Yukon' },
]

export function isProvince(id) {
  return provinces.find(x => x.id === id)
}

export const states = [
  {
    id: 'al',
    name: 'Alabama',
  },
  {
    id: 'ak',
    name: 'Alaska',
  },
  {
    id: 'as',
    name: 'American Samoa',
  },
  {
    id: 'az',
    name: 'Arizona',
  },
  {
    id: 'ar',
    name: 'Arkansas',
  },
  {
    id: 'ca',
    name: 'California',
  },
  {
    id: 'co',
    name: 'Colorado',
  },
  {
    id: 'ct',
    name: 'Connecticut',
  },
  {
    id: 'de',
    name: 'Delaware',
  },
  {
    id: 'dc',
    name: 'District Of Columbia',
  },
  {
    id: 'fm',
    name: 'Federated States Of Micronesia',
  },
  {
    id: 'fl',
    name: 'Florida',
  },
  {
    id: 'ga',
    name: 'Georgia',
  },
  {
    id: 'gu',
    name: 'Guam',
  },
  {
    id: 'hi',
    name: 'Hawaii',
  },
  {
    id: 'id',
    name: 'Idaho',
  },
  {
    id: 'il',
    name: 'Illinois',
  },
  {
    id: 'in',
    name: 'Indiana',
  },
  {
    id: 'ia',
    name: 'Iowa',
  },
  {
    id: 'ks',
    name: 'Kansas',
  },
  {
    id: 'ky',
    name: 'Kentucky',
  },
  {
    id: 'la',
    name: 'Louisiana',
  },
  {
    id: 'me',
    name: 'Maine',
  },
  {
    id: 'mh',
    name: 'Marshall Islands',
  },
  {
    id: 'md',
    name: 'Maryland',
  },
  {
    id: 'ma',
    name: 'Massachusetts',
  },
  {
    id: 'mi',
    name: 'Michigan',
  },
  {
    id: 'mn',
    name: 'Minnesota',
  },
  {
    id: 'ms',
    name: 'Mississippi',
  },
  {
    id: 'mo',
    name: 'Missouri',
  },
  {
    id: 'mt',
    name: 'Montana',
  },
  {
    id: 'ne',
    name: 'Nebraska',
  },
  {
    id: 'nv',
    name: 'Nevada',
  },
  {
    id: 'nh',
    name: 'New Hampshire',
  },
  {
    id: 'nj',
    name: 'New Jersey',
  },
  {
    id: 'nm',
    name: 'New Mexico',
  },
  {
    id: 'ny',
    name: 'New York',
  },
  {
    id: 'nc',
    name: 'North Carolina',
  },
  {
    id: 'nd',
    name: 'North Dakota',
  },
  {
    id: 'mp',
    name: 'Northern Mariana Islands',
  },
  {
    id: 'oh',
    name: 'Ohio',
  },
  {
    id: 'ok',
    name: 'Oklahoma',
  },
  {
    id: 'or',
    name: 'Oregon',
  },
  {
    id: 'pw',
    name: 'Palau',
  },
  {
    id: 'pa',
    name: 'Pennsylvania',
  },
  {
    id: 'pr',
    name: 'Puerto Rico',
  },
  {
    id: 'ri',
    name: 'Rhode Island',
  },
  {
    id: 'sc',
    name: 'South Carolina',
  },
  {
    id: 'sd',
    name: 'South Dakota',
  },
  {
    id: 'tn',
    name: 'Tennessee',
  },
  {
    id: 'tx',
    name: 'Texas',
  },
  {
    id: 'ut',
    name: 'Utah',
  },
  {
    id: 'vt',
    name: 'Vermont',
  },
  {
    id: 'vi',
    name: 'Virgin Islands',
  },
  {
    id: 'va',
    name: 'Virginia',
  },
  {
    id: 'wa',
    name: 'Washington',
  },
  {
    id: 'wv',
    name: 'West Virginia',
  },
  {
    id: 'wi',
    name: 'Wisconsin',
  },
  { id: 'wy', name: 'Wyoming' },
]

export const regions = [...provinces, ...states]

export function findRegion(id) {
  return regions.find(x => x.id === id)
}

export const volumeUnits = [
  { id: 'l', name: 'Liter' },
  { id: 'gal', name: 'Gallon' },
]

export const distanceUnits = [
  { id: 'km', name: 'Kilometre' },
  { id: 'mi', name: 'Mile' },
]

export const units = [
  ...volumeUnits,
  ...distanceUnits,
]

export function findUnit(id) {
  return units.find(x => x.id === id)
}

export function findVolumeUnitByRegion(region) {
  const id = isProvince(region) ? 'l' : 'gal'

  return volumeUnits.find(x => x.id === id)
}

export function findDistanceUnitByRegion(region) {
  const id = isProvince(region) ? 'km' : 'mi'

  return distanceUnits.find(x => x.id === id)
}


export function convertVolumeByRegionToLiters(region, volume) {
  if (isProvince(region)) {
    return Math.round(volume)
  }

  return Math.round(volume * 3.78541178)
}

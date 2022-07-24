import { MenuEntry } from '@evofinance9/uikit'

const config: MenuEntry[] = [
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'https://bitgertswap.com/',
  },
  {
    label: 'Charts',
    icon: 'TicketIcon',
    href: 'https://bitgertswap.com/',
  },
  {
    label: 'BitgertPad',
    icon: 'IfoIcon',
    initialOpenState: false,
    items: [
      {
        label: 'Create Presale',
        href: '/create-presale',
      },
      {
        label: 'Presale Directory',
        href: '/presale',
      },
      {
        label: 'Airdrop',
        href: '/create-airdrop',
      },
      {
        label: 'Airdrop Directory',
        href: '/airdrop',
      },
      {
        label: 'Lock Tokens',
        href: '/create-lock',
      },
      {
        label: 'Lockers',
        href: '/lock',
      },
    ],
  },
]

export default config

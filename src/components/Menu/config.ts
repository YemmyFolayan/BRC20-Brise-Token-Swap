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
        href: 'https://bitgertswap.com/#/swap',
      },
      {
        label: 'Airdrop',
        href: 'https://bitgertswap.com/#/pool',
      },
      {
        label: 'Airdrop Directory',
        href: 'https://bitgertswap.com/#/pool',
      },
      {
        label: 'Lock Tokens',
        href: 'https://bitgertswap.com/#/pool',
      },
      {
        label: 'Lockers',
        href: 'https://bitgertswap.com/#/pool',
      },
    ],
  },
]

export default config

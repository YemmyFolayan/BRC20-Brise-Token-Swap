import { MenuEntry } from '@evofinance9/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://bitgertswap.com/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    status: {
      text: 'MIGRATE',
      color: 'warning',
    },
    items: [
      {
        label: 'LP Migration',
        href: '/migrate',
      },
      {
        label: 'Exchange',
        href: 'https://bitgertswap.com/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://bitgertswap.com/#/pool',
      },
    ],
  },
]

export default config

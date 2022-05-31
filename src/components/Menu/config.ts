import { MenuEntry } from '@evofinance9/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://bitgertswap.netlify.app/',
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
        href: 'https://bitgertswap.netlify.app/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://bitgertswap.netlify.app/#/pool',
      },
    ],
  },
]

export default config

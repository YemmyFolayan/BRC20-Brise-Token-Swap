import { MenuEntry } from '@evofinance9/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Dashboard',
    icon: 'IfoIcon',
    href: '/dashboard',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    href: '/swap',
  },
  {
    label: 'Wallet',
    icon: 'HamburgerIcon',
    href: '/wallet',
  },
  {
    label: 'BitgertPad',
    icon: 'MoreIcon',
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
      // {
      //   label: 'Airdrop',
      //   href: '/create-airdrop',
      // },
      // {
      //   label: 'Airdrop Directory',
      //   href: '/airdrop',
      // },
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

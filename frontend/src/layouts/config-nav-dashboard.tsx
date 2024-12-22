import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [{ title: 'Ecommerce', path: paths.dashboard.root, icon: ICONS.ecommerce }],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Product',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
      {
        title: 'Order',
        path: paths.dashboard.order.root,
        icon: ICONS.order,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          { title: 'Details', path: paths.dashboard.order.demo.details },
        ],
      },
    ],
  },
  /**
   * Item State
   */
  {
    subheader: 'Misc',
    items: [],
    // items: [
    //   {
    //     // default roles : All roles can see this entry.
    //     // roles: ['user'] Only users can see this item.
    //     // roles: ['admin'] Only admin can see this item.
    //     // roles: ['admin', 'manager'] Only admin/manager can see this item.
    //     // Reference from 'src/guards/RoleBasedGuard'.
    //     title: 'Permission',
    //     path: paths.dashboard.permission,
    //     icon: ICONS.lock,
    //     roles: ['admin', 'manager'],
    //     caption: 'Only admin can see this item',
    //   },
    //   {
    //     title: 'Level',
    //     path: '#/dashboard/menu_level',
    //     icon: ICONS.menuItem,
    //     children: [
    //       {
    //         title: 'Level 1a',
    //         path: '#/dashboard/menu_level/menu_level_1a',
    //         children: [
    //           {
    //             title: 'Level 2a',
    //             path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
    //           },
    //           {
    //             title: 'Level 2b',
    //             path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
    //             children: [
    //               {
    //                 title: 'Level 3a',
    //                 path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
    //               },
    //               {
    //                 title: 'Level 3b',
    //                 path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
    //     ],
    //   },
    //   {
    //     title: 'Disabled',
    //     path: '#disabled',
    //     icon: ICONS.disabled,
    //     disabled: true,
    //   },
    //   {
    //     title: 'Label',
    //     path: '#label',
    //     icon: ICONS.label,
    //     info: (
    //       <Label
    //         color="info"
    //         variant="inverted"
    //         startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
    //       >
    //         NEW
    //       </Label>
    //     ),
    //   },
    //   {
    //     title: 'Caption',
    //     path: '#caption',
    //     icon: ICONS.menuItem,
    //     caption:
    //       'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
    //   },
    //   {
    //     title: 'Params',
    //     path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    //     icon: ICONS.parameter,
    //   },
    //   {
    //     title: 'External link',
    //     path: 'https://www.google.com/',
    //     icon: ICONS.external,
    //     info: <Iconify width={18} icon="prime:external-link" />,
    //   },
    //   { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
    // ],
  },
];

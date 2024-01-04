import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'default',
  //       title: 'Default',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/default',
  //       icon: 'ti ti-dashboard',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'ti ti-dashboard',
    type: 'item',
    classes: 'nav-item',
    url: '/default',
    breadcrumbs: false
  },
  // {
  //   id: 'Employee',
  //   title: 'Employee',
  //   icon: 'ti ti-key',
  //   type: 'item',
  //   classes: 'nav-item',
  //   url: '/default',
  //   breadcrumbs: false
  // },
  {
        id: 'Employee',
        title: 'Employee',
        type: 'collapse',
        icon: 'ti ti-key icon-navigation',
        classes: 'nav-item',
        children: [
          // {
          //   id: 'login',
          //   title: 'Login',
          //   type: 'item',
          //   url: '/guest/login',
          //   target: true,
          //   breadcrumbs: false
          // },
          // {
          //   id: 'register',
          //   title: 'Register',
          //   type: 'item',
          //   url: '/guest/register',
          //   target: true,
          //   breadcrumbs: false
          // },
          {
            id: 'addemployee',
            title: 'Add Employee',
            type: 'item',
            url: '/addemployee',
            // target: true,
            breadcrumbs: false
          },
          {
            id: 'viewemployee',
            title: 'View Employee',
            type: 'item',
            url: '/viewemployee',
            // target: true,
            breadcrumbs: false
          },
          {
            id: 'employeeapproval',
            title: ' Employee Approval',
            type: 'item',
            url: '/employeeapproval',
            // target: true,
            breadcrumbs: false
          }
        ]
  },
  {
    id: 'Company Information',
    title: 'Company Information',
    type: 'collapse',
    icon: 'ti  ti-list icon-navigation',
    classes: 'nav-item',
    children: [
      {
        id: 'company',
        title: 'Company',
        type: 'item',
        url: '/company',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'location',
        title: 'Location',
        type: 'item',
        url: '/location',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'department',
        title: 'Department',
        type: 'item',
        url: '/department',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'subdepartment',
        title: 'Sub Department',
        type: 'item',
        url: '/subdepartment',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'designation',
        title: 'Designation',
        type: 'item',
        url: '/designation',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'qualification',
        title: 'Qualification',
        type: 'item',
        url: '/qualification',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'degree',
        title: 'Degree',
        type: 'item',
        url: '/degree',
        // target: true,
        breadcrumbs: false
      }
    ]},
  {
    id: 'Salary',
    title: 'Salary',
    type: 'collapse',
    icon: 'ti  ti-wallet icon-navigation',
    classes: 'nav-item',
    children: [
      // {
      //   id: 'login',
      //   title: 'Login',
      //   type: 'item',
      //   url: '/guest/login',
      //   target: true,
      //   breadcrumbs: false
      // },
      // {
      //   id: 'register',
      //   title: 'Register',
      //   type: 'item',
      //   url: '/guest/register',
      //   target: true,
      //   breadcrumbs: false
      // },
      {
        id: 'SalarySlab',
        title: 'Salary Slab',
        type: 'item',
        url: '/salaryslab',
        // target: true,
        breadcrumbs: false
      },
    ]
},
  // {
  //   id: 'elements',
  //   title: 'Elements',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'typography',
  //       title: 'Typography',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/typography',
  //       icon: 'ti ti-typography'
  //     },
  //     {
  //       id: 'color',
  //       title: 'Colors',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/color',
  //       icon: 'ti ti-brush'
  //     },
  //     {
  //       id: 'tabler',
  //       title: 'Tabler',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://tabler-icons.io/',
  //       icon: 'ti ti-plant-2',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'ti ti-brand-chrome'
  //     },
  //     {
  //       id: 'document',
  //       title: 'Document',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/berry-angular/',
  //       icon: 'ti ti-vocabulary',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}

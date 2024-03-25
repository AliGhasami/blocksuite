import bulleted_list from './icons/bulleted_list.svg?raw';
import check_list from './icons/check_list.svg?raw';
import divider from './icons/divider.svg?raw';
import h1 from './icons/h1.svg?raw';
import h2 from './icons/h2.svg?raw';
import h3 from './icons/h3.svg?raw';
import numbered_list from './icons/numbered_list.svg?raw';
interface ClayTapSlashMenuGroup {
  groupName: string;
  children: ClayTapSlashMenu[];
}
interface ClayTapSlashMenu {
  icon: string;
  title: string;
  description: string;
  action: () => void;
}
export const clayTapGroupMenu: ClayTapSlashMenuGroup[] = [
  {
    groupName: 'Text Style',
    children: [
      {
        title: 'Heading 1',
        description: 'Big Heading.',
        icon: h1,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Heading 2',
        description: 'Medium Heading.',
        icon: h2,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Heading 3',
        description: 'Small Heading',
        icon: h3,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Bulleted List',
        description: 'Description Bulleted List',
        icon: bulleted_list,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Check List',
        description: 'Description Check List',
        icon: check_list,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Numbered List',
        description: 'Description Check List',
        icon: numbered_list,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Quote',
        description: 'Description Quote',
        icon: h1,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Divider',
        description: 'Description Divider',
        icon: divider,
        action: () => {
          //console.log(1111);
        },
      },
    ],
  },
  {
    groupName: 'Insert',
    children: [
      {
        title: 'Heading 1',
        description: 'Big Heading',
        icon: h1,
        action: () => {
          console.log(1111);
        },
      },
    ],
  },
  {
    groupName: 'Text Style',
    children: [
      {
        title: 'Heading 1',
        description: 'Big Heading',
        icon: h1,
        action: () => {
          console.log(1111);
        },
      },
    ],
  },
];

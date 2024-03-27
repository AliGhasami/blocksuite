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
        title: 'Text',
        description: 'Big Heading.',
        icon: h1,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'HeadingB',
        description: 'Big Heading.',
        icon: h1,
        action: () => {
          //console.log(1111);
        },
      },
      {
        title: 'Kanban View',
        description: 'Big Heading.',
        icon: h1,
        action: () => {
          //console.log(1111);
        },
      },
    ],
  },
  /*{
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
  },*/
  /*{
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
  },*/
];

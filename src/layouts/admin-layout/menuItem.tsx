export const menuItems = [
  {
    name: "Dashboard",
    url: 'admin-home',
    roles: ["Admin","Author", "Editor", "Reviewer"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        />
      </svg>
    )
  },
  {
    name: "Submissions",
    roles: ["Admin", "Author", "Editor", "Reviewer"],
    url: 'submission-form',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round"
        className="lucide lucide-send-icon lucide-send">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" /></svg>
    )
  },
  {
    name: "Articles",
    roles: ["Admin", "Editor", "Reviewer"],
    url: 'article',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className="lucide lucide-newspaper-icon lucide-newspaper">
        <path d="M15 18h-5"/><path d="M18 14h-8"/>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/>
      <rect width="8" height="4" x="10" y="6" rx="1"/></svg>
    )
  },
  {
    name: "Journal",
    roles: ["Admin",  "Editor"],
    url: 'Journals-page',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className="lucide lucide-newspaper-icon lucide-newspaper">
        <path d="M15 18h-5"/><path d="M18 14h-8"/>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/>
      <rect width="8" height="4" x="10" y="6" rx="1"/></svg>
    )
  },
  {
    name: "Issue",
    roles: ["Admin", "Editor"],
    url: 'issue-list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className="lucide lucide-newspaper-icon lucide-newspaper">
        <path d="M15 18h-5"/><path d="M18 14h-8"/>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/>
      <rect width="8" height="4" x="10" y="6" rx="1"/></svg>
    )
  },
 
  {
    name: "Masters",
    roles: ["Admin"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    submenu: [
      { name: "Role", url: "role-master" },
      { name: "Users", url: "user" },
    ],
  },
  
];
export const adminMenu = [
  {
    //Quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

        // ]
      },
      // {
      //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
      // },

      {
        //Quản lí kế hoạch khám bệnh của bác sĩ

        name: "menu.doctor.manage-schedule",
        link: "/system/schedule-doctor",
      },
    ],
  },
  {
    //Quản lí phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Quản lí chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //Quản lí cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
  {
    //Quản lí cẩm nang
    name: "menu.admin.introduction",
    menus: [
      {
        name: "menu.admin.manage-introduction",
        link: "/system/manage-introduction",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-doctor",
    menus: [
      {
        //Quản lí kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/doctor-manage-schedule",
      },
      {
        //Quản lí bệnh nhân khám bệnh của bác sĩ
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  }, {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/recommendationFront-end',
    name: 'Front-end',
    meta: {
      title: '前端',
      icon: 'front-end'
    },
    children: [{
        path: 'recommendationFront-end',
        name: 'RecommendationFront-end',
        component: () => import('@/views/front-end/recommendation/index'),
        meta: {
          title: '前端-热门推荐',
          icon: 'recommendation'
        }
      },
      {
        path: 'frontFrameFront-end',
        name: 'FrontFrameFront-end',
        component: () => import('@/views/front-end/frontFrame/index'),
        meta: {
          title: '前端-前端框架',
          icon: 'frontFrame'
        }
      },
      {
        path: 'forumCommunityFront-end',
        name: 'ForumCommunityFront-end',
        component: () => import('@/views/front-end/forumCommunity/index'),
        meta: {
          title: '前端-论坛社区',
          icon: 'forumCommunity'
        }
      },
      {
        path: 'learningPlatformFront-end',
        name: 'LearningPlatformFront-end',
        component: () => import('@/views/front-end/learningPlatform/index'),
        meta: {
          title: '前端-学习平台',
          icon: 'learningPlatform'
        }
      },
      {
        path: 'onlineProgrammingFront-end',
        name: 'OnlineProgrammingFront-end',
        component: () => import('@/views/front-end/onlineProgramming/index'),
        meta: {
          title: '前端-在线编程',
          icon: 'onlineProgramming'
        }
      },
      {
        path: 'javaScriptFrameworkFront-end',
        name: 'JavaScriptFrameworkFront-end',
        component: () => import('@/views/front-end/javaScriptFramework/index'),
        meta: {
          title: '前端-JavaScript框架',
          icon: 'javaScriptFramework'
        }
      },
      {
        path: 'codeHostingFront-end',
        name: 'CodeHostingFront-end',
        component: () => import('@/views/front-end/codeHosting/index'),
        meta: {
          title: '前端-代码托管',
          icon: 'codeHosting'
        }
      },
      {
        path: 'inspectionTestFront-end',
        name: 'InspectionTestFront-end',
        component: () => import('@/views/front-end/inspectionTest/index'),
        meta: {
          title: '前端-检查测试',
          icon: 'inspectionTest'
        }
      },
      {
        path: 'CSSFrameworkFront-end',
        name: 'CSSFrameworkFront-end',
        component: () => import('@/views/front-end/CSSFramework/index'),
        meta: {
          title: '前端-CSS框架',
          icon: 'CSSFramework'
        }
      },
      {
        path: 'techDocFront-end',
        name: 'TechDocFront-end',
        component: () => import('@/views/front-end/techDoc/index'),
        meta: {
          title: '前端-技术文档',
          icon: 'techDoc'
        }
      },
      {
        path: 'buildToolFront-end',
        name: 'BuildToolFront-end',
        component: () => import('@/views/front-end/buildTool/index'),
        meta: {
          title: '前端-构建工具',
          icon: 'buildTool'
        }
      },
      {
        path: '/iframeNav',
        name: 'frontIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/back-end',
    component: Layout,
    redirect: '/back-end/recommendationBack-end',
    name: 'Back-end',
    meta: {
      title: '后端',
      icon: 'back-end'
    },
    children: [{
        path: 'recommendationBack-end',
        name: 'RecommendationBack-end',
        component: () => import('@/views/back-end/recommendation/index'),
        meta: {
          title: '后端-热门推荐',
          icon: 'recommendation'
        }
      },
      {
        path: 'frontFrameBack-end',
        name: 'FrontFrameBack-end',
        component: () => import('@/views/back-end/frontFrame/index'),
        meta: {
          title: '后端-后端框架',
          icon: 'frontFrame'
        }
      },
      {
        path: 'forumCommunityBack-end',
        name: 'ForumCommunityBack-end',
        component: () => import('@/views/back-end/forumCommunity/index'),
        meta: {
          title: '后端-论坛社区',
          icon: 'forumCommunity'
        }
      },
      {
        path: 'learningPlatformBack-end',
        name: 'LearningPlatformBack-end',
        component: () => import('@/views/back-end/learningPlatform/index'),
        meta: {
          title: '后端-学习平台',
          icon: 'learningPlatform'
        }
      },
      {
        path: 'onlineProgrammingBack-end',
        name: 'OnlineProgrammingBack-end',
        component: () => import('@/views/back-end/onlineProgramming/index'),
        meta: {
          title: '后端-在线编程',
          icon: 'onlineProgramming'
        }
      },
      {
        path: 'personalFrameworkBack-end',
        name: 'PersonalFrameworkBack-end',
        component: () => import('@/views/back-end/personalFramework/index'),
        meta: {
          title: '后端-个人框架',
          icon: 'personalFramework'
        }
      },
      {
        path: 'codeHostingBack-end',
        name: 'CodeHostingBack-end',
        component: () => import('@/views/back-end/codeHosting/index'),
        meta: {
          title: '后端-代码托管',
          icon: 'codeHosting'
        }
      },
      {
        path: 'inspectionTestBack-end',
        name: 'InspectionTestBack-end',
        component: () => import('@/views/back-end/inspectionTest/index'),
        meta: {
          title: '后端-检查测试',
          icon: 'inspectionTest'
        }
      },
      {
        path: 'contentManagementBack-end',
        name: 'ContentManagementBack-end',
        component: () => import('@/views/back-end/contentManagement/index'),
        meta: {
          title: '后端-内容管理',
          icon: 'contentManagement'
        }
      },
      {
        path: 'buildToolBack-end',
        name: 'BuildToolBack-end',
        component: () => import('@/views/back-end/buildTool/index'),
        meta: {
          title: '后端-构建工具',
          icon: 'buildTool'
        }
      },
      {
        path: '/back-end/iframeNav',
        name: 'backIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/design',
    component: Layout,
    redirect: '/design/recommendationDesign',
    name: 'Design',
    meta: {
      title: '设计',
      icon: 'design'
    },
    children: [{
        path: 'recommendationDesign',
        name: 'RecommendationDesign',
        component: () => import('@/views/design/recommendation/index'),
        meta: {
          title: '设计-热门推荐',
          icon: 'recommendation'
        }
      },
      {
        path: 'inspiration ',
        name: 'Inspiration',
        component: () => import('@/views/design/inspiration/index'),
        meta: {
          title: '设计-灵感采集',
          icon: 'inspiration'
        }
      },
      {
        path: 'interaction',
        name: 'Interaction',
        component: () => import('@/views/design/interaction/index'),
        meta: {
          title: '设计-界面交互',
          icon: 'interaction'
        }
      },
      {
        path: 'designSpecifications',
        name: 'DesignSpecifications',
        component: () => import('@/views/design/designSpecifications/index'),
        meta: {
          title: '设计-设计规范',
          icon: 'designSpecifications'
        }
      },
      {
        path: 'onlineTools',
        name: 'OnlineTools',
        component: () => import('@/views/design/onlineTools/index'),
        meta: {
          title: '设计-在线工具',
          icon: 'onlineTools'
        }
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/design/icon/index'),
        meta: {
          title: '设计-icon图标',
          icon: 'icon'
        }
      },
      {
        path: 'designMaterial',
        name: 'DesignMaterial',
        component: () => import('@/views/design/designMaterial/index'),
        meta: {
          title: '设计-设计素材',
          icon: 'designMaterial'
        }
      },
      {
        path: 'galleryMaterial',
        name: 'GalleryMaterial',
        component: () => import('@/views/design/galleryMaterial/index'),
        meta: {
          title: '设计-图库素材',
          icon: 'galleryMaterial'
        }
      },
      {
        path: 'colourAssortment',
        name: 'ColourAssortment',
        component: () => import('@/views/design/colourAssortment/index'),
        meta: {
          title: '设计-颜色搭配',
          icon: 'colourAssortment'
        }
      },
      {
        path: 'fontGlyph',
        name: 'FontGlyph',
        component: () => import('@/views/design/fontGlyph/index'),
        meta: {
          title: '设计-字体字形',
          icon: 'fontGlyph'
        }
      },
      {
        path: 'learningTutorial',
        name: 'LearningTutorial',
        component: () => import('@/views/design/learningTutorial/index'),
        meta: {
          title: '设计-学习教程',
          icon: 'learningTutorial'
        }
      },
      {
        path: 'designTeam',
        name: 'DesignTeam',
        component: () => import('@/views/design/designTeam/index'),
        meta: {
          title: '设计-设计团队',
          icon: 'designTeam'
        }
      },
      {
        path: '/design/iframeNav',
        name: 'designIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/recommendationProduct',
    name: 'Product',
    meta: {
      title: '产品',
      icon: 'product'
    },
    children: [{
        path: 'recommendationProduct',
        name: 'RecommendationProduct',
        component: () => import('@/views/product/recommendation/index'),
        meta: {
          title: '产品-热门推荐',
          icon: 'recommendation'
        }
      },
      {
        path: 'productInformation ',
        name: 'ProductInformation',
        component: () => import('@/views/product/productInformation/index'),
        meta: {
          title: '产品-产品资讯',
          icon: 'productInformation'
        }
      },
      {
        path: 'prototypeTool',
        name: 'PrototypeTool',
        component: () => import('@/views/product/prototypeTool/index'),
        meta: {
          title: '产品-原型工具',
          icon: 'prototypeTool'
        }
      },
      {
        path: 'mindMap',
        name: 'MindMap',
        component: () => import('@/views/product/mindMap/index'),
        meta: {
          title: '产品-思维导图',
          icon: 'mindMap'
        }
      },
      {
        path: 'teamwork',
        name: 'Teamwork',
        component: () => import('@/views/product/teamwork/index'),
        meta: {
          title: '产品-协同工作',
          icon: 'teamwork'
        }
      },
      {
        path: 'documentEditing',
        name: 'DocumentEditing',
        component: () => import('@/views/product/documentEditing/index'),
        meta: {
          title: '产品-文档编辑',
          icon: 'documentEditing'
        }
      },
      {
        path: 'diskStorage',
        name: 'DiskStorage',
        component: () => import('@/views/product/diskStorage/index'),
        meta: {
          title: '产品-云盘储存',
          icon: 'diskStorage'
        }
      },
      {
        path: 'interestingProducts',
        name: 'InterestingProducts',
        component: () => import('@/views/product/interestingProducts/index'),
        meta: {
          title: '产品-趣味产品',
          icon: 'interestingProducts'
        }
      },
      {
        path: '/product/iframeNav',
        name: 'productIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/operate',
    component: Layout,
    redirect: '/operate/domainName',
    name: 'Operate',
    meta: {
      title: '运营',
      icon: 'operate'
    },
    children: [{
        path: 'domainName',
        name: 'DomainName',
        component: () => import('@/views/operate/domainName/index'),
        meta: {
          title: '运营-域名注册',
          icon: 'domainName'
        }
      },
      {
        path: 'dataAnalysis ',
        name: 'DataAnalysis',
        component: () => import('@/views/operate/dataAnalysis/index'),
        meta: {
          title: '运营-数据分析',
          icon: 'dataAnalysis'
        }
      },
      {
        path: 'dataTools',
        name: 'DataTools',
        component: () => import('@/views/operate/dataTools/index'),
        meta: {
          title: '运营-数据工具',
          icon: 'dataTools'
        }
      },
      {
        path: 'dataCollection',
        name: 'DataCollection',
        component: () => import('@/views/operate/dataCollection/index'),
        meta: {
          title: '运营-数据收集',
          icon: 'dataCollection'
        }
      },
      {
        path: 'mediaPlatform',
        name: 'MediaPlatform',
        component: () => import('@/views/operate/mediaPlatform/index'),
        meta: {
          title: '运营-新媒平台',
          icon: 'mediaPlatform'
        }
      },
      {
        path: 'mediaTools',
        name: 'MediaTools',
        component: () => import('@/views/operate/mediaTools/index'),
        meta: {
          title: '运营-新媒工具',
          icon: 'mediaTools'
        }
      },
      {
        path: 'websiteInclusion',
        name: 'WebsiteInclusion',
        component: () => import('@/views/operate/websiteInclusion/index'),
        meta: {
          title: '运营-网站收录',
          icon: 'websiteInclusion'
        }
      },
      {
        path: 'ASOOptimization',
        name: 'ASOOptimization',
        component: () => import('@/views/operate/ASOOptimization/index'),
        meta: {
          title: '运营-ASO优化',
          icon: 'ASOOptimization'
        }
      },
      {
        path: '/operate/iframeNav',
        name: 'operateIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/jobs',
    component: Layout,
    redirect: '/jobs/recruitmentPlatform',
    name: 'Jobs',
    meta: {
      title: '工作',
      icon: 'jobs'
    },
    children: [{
        path: 'recruitmentPlatform',
        name: 'RecruitmentPlatform',
        component: () => import('@/views/jobs/recruitmentPlatform/index'),
        meta: {
          title: '工作-招聘平台',
          icon: 'recruitmentPlatform'
        }
      },
      {
        path: 'partTimeProgram',
        name: 'PartTimeProgram',
        component: () => import('@/views/jobs/partTimeProgram/index'),
        meta: {
          title: '工作-程序兼职',
          icon: 'partTimeProgram'
        }
      },
      {
        path: 'partTimeDesign',
        name: 'PartTimeDesign',
        component: () => import('@/views/jobs/partTimeDesign/index'),
        meta: {
          title: '工作-设计兼职',
          icon: 'partTimeDesign'
        }
      },
      {
        path: '/jobs/iframeNav',
        name: 'jobsIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/geeks',
    component: Layout,
    redirect: '/geeks/developmentHardware',
    name: 'Geeks',
    meta: {
      title: '极客',
      icon: 'geeks'
    },
    children: [{
        path: 'developmentHardware',
        name: 'DevelopmentHardware',
        component: () => import('@/views/geeks/developmentHardware/index'),
        meta: {
          title: '极客-开发硬件',
          icon: 'developmentHardware'
        }
      },
      {
        path: 'hardwareSystem',
        name: 'HardwareSystem',
        component: () => import('@/views/geeks/hardwareSystem/index'),
        meta: {
          title: '极客-硬件系统',
          icon: 'hardwareSystem'
        }
      },
      {
        path: 'otherTools',
        name: 'OtherTools',
        component: () => import('@/views/geeks/otherTools/index'),
        meta: {
          title: '极客-其他工具',
          icon: 'otherTools'
        }
      },
      {
        path: 'informationInquiry',
        name: 'InformationInquiry',
        component: () => import('@/views/geeks/informationInquiry/index'),
        meta: {
          title: '极客-信息查询',
          icon: 'informationInquiry'
        }
      },
      {
        path: 'gameSystem',
        name: 'GameSystem',
        component: () => import('@/views/geeks/gameSystem/index'),
        meta: {
          title: '极客-游戏系统',
          icon: 'gameSystem'
        }
      },
      {
        path: '/geeks/iframeNav',
        name: 'geeksIframeNav',
        hidden: true,
        component: () => import('@/views/iframeNav/index'),
        meta: {
          title: '网站',
          icon: 'iframeNav'
        }
      }
    ]
  },

  {
    path: '/submit',
    component: Layout,
    redirect: '/submit',
    children: [{
      path: 'submit',
      name: 'Submit',
      component: () => import('@/views/submit/index'),
      meta: {
        title: '操作',
        icon: 'submit'
      }
    }]
  },

  {
    path: '/superAdmin',
    component: Layout,
    redirect: '/superAdmin/interactive',
    hidden: true,
    name: 'SuperAdmin',
    meta: {
      title: '超管',
      icon: 'superAdmin'
    },
    children: [{
        path: 'interactive',
        name: 'Interactive',
        component: () => import('@/views/superAdmin/interactive/index'),
        meta: {
          title: '超管-交互',
          icon: 'interactive'
        }
      },
      {
        path: 'handle',
        name: 'Handle',
        component: () => import('@/views/superAdmin/handle/index'),
        meta: {
          title: '超管-操作',
          icon: 'handle'
        }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
    path: '/superAdmin',
    component: Layout,
    redirect: '/superAdmin/interactive',
    name: 'SuperAdmin',
    meta: {
      title: '超管',
      icon: 'superAdmin'
    },
    children: [{
        path: 'interactive',
        name: 'Interactive',
        component: () => import('@/views/superAdmin/interactive/index'),
        meta: {
          title: '超管-交互',
          icon: 'interactive'
        }
      },
      {
        path: 'handle',
        name: 'Handle',
        component: () => import('@/views/superAdmin/handle/index'),
        meta: {
          title: '超管-操作',
          icon: 'handle'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

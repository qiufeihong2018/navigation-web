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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '操作', icon: 'dashboard' }
    }]
  },

  {
    path: '/front-end',
    component: Layout,
    redirect: '/front-end/recommendation',
    name: 'Front-end',
    meta: { title: '前端', icon: 'example' },
    children: [
      {
        path: 'recommendation',
        name: 'Recommendation',
        component: () => import('@/views/recommendation/index'),
        meta: { title: '前端-热门推荐', icon: 'tree' }
      },
      {
        path: 'frontFrame',
        name: 'FrontFrame',
        component: () => import('@/views/frontFrame/index'),
        meta: { title: '前端-前端框架', icon: 'tree' }
      },
      {
        path: 'forumCommunity',
        name: 'ForumCommunity',
        component: () => import('@/views/forumCommunity/index'),
        meta: { title: '前端-论坛社区', icon: 'table' }
      },
      {
        path: 'learningPlatform',
        name: 'LearningPlatform',
        component: () => import('@/views/learningPlatform/index'),
        meta: { title: '前端-学习平台', icon: 'tree' }
      },
      {
        path: 'onlineProgramming',
        name: 'OnlineProgramming',
        component: () => import('@/views/onlineProgramming/index'),
        meta: { title: '前端-在线编程', icon: 'table' }
      },
      {
        path: 'personalFramework',
        name: 'PersonalFramework',
        component: () => import('@/views/personalFramework/index'),
        meta: { title: '前端-个人框架', icon: 'tree' }
      },
      {
        path: 'codeHosting',
        name: 'CodeHosting',
        component: () => import('@/views/codeHosting/index'),
        meta: { title: '前端-代码托管', icon: 'table' }
      },
      {
        path: 'inspectionTest',
        name: 'InspectionTest',
        component: () => import('@/views/inspectionTest/index'),
        meta: { title: '前端-检查测试', icon: 'tree' }
      },
      {
        path: 'contentManagement',
        name: 'ContentManagement',
        component: () => import('@/views/contentManagement/index'),
        meta: { title: '前端-内容管理', icon: 'table' }
      },
      {
        path: 'buildTool',
        name: 'BuildTool',
        component: () => import('@/views/buildTool/index'),
        meta: { title: '前端-构建工具', icon: 'tree' }
      }
    ]
  },

  {
    path: '/back-end',
    component: Layout,
    redirect: '/back-end/recommendation',
    name: 'Back-end',
    meta: { title: '后端', icon: 'example' },
    children: [
      {
        path: 'recommendation',
        name: 'Recommendation',
        component: () => import('@/views/recommendation/index'),
        meta: { title: '后端-热门推荐', icon: 'tree' }
      },
      {
        path: 'frontFrame',
        name: 'FrontFrame',
        component: () => import('@/views/frontFrame/index'),
        meta: { title: '后端-后端框架', icon: 'tree' }
      },
      {
        path: 'forumCommunity',
        name: 'ForumCommunity',
        component: () => import('@/views/forumCommunity/index'),
        meta: { title: '后端-论坛社区', icon: 'table' }
      },
      {
        path: 'learningPlatform',
        name: 'LearningPlatform',
        component: () => import('@/views/learningPlatform/index'),
        meta: { title: '后端-学习平台', icon: 'tree' }
      },
      {
        path: 'onlineProgramming',
        name: 'OnlineProgramming',
        component: () => import('@/views/onlineProgramming/index'),
        meta: { title: '后端-在线编程', icon: 'table' }
      },
      {
        path: 'personalFramework',
        name: 'PersonalFramework',
        component: () => import('@/views/personalFramework/index'),
        meta: { title: '后端-个人框架', icon: 'tree' }
      },
      {
        path: 'codeHosting',
        name: 'CodeHosting',
        component: () => import('@/views/codeHosting/index'),
        meta: { title: '后端-代码托管', icon: 'table' }
      },
      {
        path: 'inspectionTest',
        name: 'InspectionTest',
        component: () => import('@/views/inspectionTest/index'),
        meta: { title: '后端-检查测试', icon: 'tree' }
      },
      {
        path: 'contentManagement',
        name: 'ContentManagement',
        component: () => import('@/views/contentManagement/index'),
        meta: { title: '后端-内容管理', icon: 'table' }
      },
      {
        path: 'buildTool',
        name: 'BuildTool',
        component: () => import('@/views/buildTool/index'),
        meta: { title: '后端-构建工具', icon: 'tree' }
      }
    ]
  },

  {
    path: '/design',
    component: Layout,
    redirect: '/design/recommendation',
    name: 'Design',
    meta: { title: '设计', icon: 'example' },
    children: [
      {
        path: 'recommendation',
        name: 'Recommendation',
        component: () => import('@/views/design/recommendation/index'),
        meta: { title: '设计-热门推荐', icon: 'tree' }
      },
      {
        path: 'inspiration ',
        name: 'Inspiration',
        component: () => import('@/views/design/inspiration/index'),
        meta: { title: '设计-灵感采集', icon: 'tree' }
      },
      {
        path: 'interaction',
        name: 'Interaction',
        component: () => import('@/views/design/interaction/index'),
        meta: { title: '设计-界面交互', icon: 'table' }
      },
      {
        path: 'designSpecifications',
        name: 'DesignSpecifications',
        component: () => import('@/views/design/designSpecifications/index'),
        meta: { title: '设计-设计规范', icon: 'tree' }
      },
      {
        path: 'onlineTools',
        name: 'OnlineTools',
        component: () => import('@/views/design/onlineTools/index'),
        meta: { title: '设计-在线工具', icon: 'table' }
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/design/icon/index'),
        meta: { title: '设计-icon图标', icon: 'tree' }
      },
      {
        path: 'designMaterial',
        name: 'DesignMaterial',
        component: () => import('@/views/design/designMaterial/index'),
        meta: { title: '设计-设计素材', icon: 'table' }
      },
      {
        path: 'galleryMaterial',
        name: 'GalleryMaterial',
        component: () => import('@/views/design/galleryMaterial/index'),
        meta: { title: '设计-图库素材', icon: 'tree' }
      },
      {
        path: 'colourAssortment',
        name: 'ColourAssortment',
        component: () => import('@/views/design/colourAssortment/index'),
        meta: { title: '设计-颜色搭配', icon: 'table' }
      },
      {
        path: 'fontGlyph',
        name: 'FontGlyph',
        component: () => import('@/views/design/fontGlyph/index'),
        meta: { title: '设计-字体字形', icon: 'tree' }
      },
      {
        path: 'learningTutorial',
        name: 'LearningTutorial',
        component: () => import('@/views/design/learningTutorial/index'),
        meta: { title: '设计-学习教程', icon: 'table' }
      },
      {
        path: 'designTeam',
        name: 'DesignTeam',
        component: () => import('@/views/design/designTeam/index'),
        meta: { title: '设计-设计团队', icon: 'tree' }
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/recommendation',
    name: 'Product',
    meta: { title: '产品', icon: 'example' },
    children: [
      {
        path: 'recommendation',
        name: 'Recommendation',
        component: () => import('@/views/product/recommendation/index'),
        meta: { title: '产品-热门推荐', icon: 'tree' }
      },
      {
        path: 'productInformation ',
        name: 'ProductInformation',
        component: () => import('@/views/product/productInformation/index'),
        meta: { title: '产品-产品资讯', icon: 'tree' }
      },
      {
        path: 'prototypeTool',
        name: 'PrototypeTool',
        component: () => import('@/views/product/prototypeTool/index'),
        meta: { title: '产品-原型工具', icon: 'table' }
      },
      {
        path: 'mindMap',
        name: 'MindMap',
        component: () => import('@/views/product/mindMap/index'),
        meta: { title: '产品-思维导图', icon: 'tree' }
      },
      {
        path: 'teamwork',
        name: 'Teamwork',
        component: () => import('@/views/product/teamwork/index'),
        meta: { title: '产品-协同工作', icon: 'table' }
      },
      {
        path: 'documentEditing',
        name: 'DocumentEditing',
        component: () => import('@/views/product/documentEditing/index'),
        meta: { title: '产品-文档编辑', icon: 'tree' }
      },
      {
        path: 'diskStorage',
        name: 'DiskStorage',
        component: () => import('@/views/product/diskStorage/index'),
        meta: { title: '产品-云盘储存', icon: 'table' }
      },
      {
        path: 'interestingProducts',
        name: 'InterestingProducts',
        component: () => import('@/views/product/interestingProducts/index'),
        meta: { title: '产品-趣味产品', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

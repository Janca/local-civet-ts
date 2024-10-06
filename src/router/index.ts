import {createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw} from 'vue-router'
import {ModelGallerySearch, ModelGalleryView} from '@/views/ModelGalleryView'
import {ModelView} from '@/views/ModelView'
import {ApplicationRouterView} from '@/components/Application'
import useTheme from '@/compositions/useTheme'

const {
    primary
} = useTheme()

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: ApplicationRouterView,
        children: [
            {
                path: '',
                name: 'home',
                components: {
                    default: ModelGalleryView,
                    applicationBar: ModelGallerySearch
                }
            },
            {
                path: '/model/:modelIndex/:versionIndex',
                name: 'model-details',
                component: ModelView,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

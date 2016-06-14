export function configRouter(router) {
    router.map({
        "/":{
            component:require("../nav.vue"),
            subRoutes:{
                "/":{
                    component:require("../pages/home.vue")  
                },
                "/news":{
                    component:require("../pages/news.vue")
                },
                "/news/:id":{
                    component:require("../pages/newsConetnt.vue")
                }
            }
        }
    })
}
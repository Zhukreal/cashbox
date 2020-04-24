import { HomePage } from "./home/homePage"
import { AboutPage } from "./about/aboutPage"
import { ContactPage } from "./contact/page"
import { RegistrationPage } from "./registration/page"
import { LoginPage } from "./login/loginPage"
import { StorybookPage } from "./storybook/storybookPage"
import { OfferPage } from "./offer/offerPage"
import { TestPage } from "./test/page"
import { TestPage2 } from "./test/test2"

import { NotFoundPage } from "./internal/not-found/page"


export const routes = () => [
    {
        path: "/",
        exact: true,
        component: HomePage,
    },
    {
        path: "/about",
        exact: true,
        component: AboutPage,
    },
    {
        path: "/contact",
        exact: true,
        component: ContactPage,
    },
    {
        path: "/registration",
        exact: true,
        component: RegistrationPage,
    },
    {
        path: "/login",
        exact: true,
        component: LoginPage,
    },
    {
        path: "/storybook",
        exact: true,
        component: StorybookPage,
    },
    {
        path: "/offers/:id",
        exact: true,
        component: OfferPage,
    },
    {
        path: "/test",
        exact: true,
        component: TestPage,
    },
    {
        path: "/test2",
        exact: true,
        component: TestPage2,
    },

    { component: NotFoundPage }
]

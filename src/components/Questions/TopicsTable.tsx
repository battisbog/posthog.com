import React from 'react'

import Link from 'components/Link'
import {
    Apps,
    Brackets,
    Cursor,
    Database,
    Dashboard,
    Ellipsis,
    Flask,
    Gear,
    Graph,
    People,
    RewindPlay,
    Receipt,
    Rocket,
    Toggle,
    Terminal,
    Toolbar,
    Upload,
    User,
    Funnels,
    Trends,
} from 'components/NewIcons'

import { Megaphone, SparksJoy } from 'components/NotProductIcons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Cohorts, PathAnalysis } from 'components/Icons'
import { API, DataManagement, DataWarehouse } from 'components/ProductIcons'
dayjs.extend(relativeTime)

export const topicIcons = {
    'a/b testing': Flask,
    api: Terminal,
    apps: Apps,
    cohorts: Cohorts,
    configuration: Gear,
    dashboards: Dashboard,
    deployment: Rocket,
    'events & actions': Cursor,
    'event pipelines': User,
    'feature flags': Toggle,
    funnels: Funnels,
    gcp: DataWarehouse,
    groups: People,
    'helm chart': DataWarehouse,
    hogql: Database,
    'identify users': DataManagement,
    kubernetes: DataWarehouse,
    'migrating to posthog': DataManagement,
    migration: Upload,
    paths: PathAnalysis,
    'people & properties': Brackets,
    'pricing & billing': Receipt,
    'product analytics': Graph,
    'session replay': RewindPlay,
    'sparks joy': SparksJoy,
    trends: Trends,
    toolbar: Toolbar,
    uncategorized: Ellipsis,
    sdks: API,
    'community spotlight': Megaphone,
}

export const TopicsTable = ({ topics, topicGroup, className = '' }) => {
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pb-1 items-center text-primary/75 dark:text-primary-dark/75 text-sm">
                <div className="col-span-8 md:col-span-10">{topicGroup}</div>
                <div className="col-span-4 md:col-span-2">Last active</div>
            </li>
            <li className="list-none">
                {topics?.data?.length > 0 &&
                    topics.data.filter(Boolean).map((topic) => {
                        const {
                            id,
                            attributes: { label, slug, questions },
                        } = topic

                        const Icon = topicIcons[label.toLowerCase()]

                        const [latestQuestion] = questions?.data || []

                        return (
                            <div key={id}>
                                <Link
                                    to={`/questions/topic/${slug}`}
                                    className={`${className} block py-2 -ml-4 -mr-4 pl-4 pr-4 mt-[1px] rounded-md hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative hover:scale-[1.005] active:scale-[1] hover:top-[-.5px] active:top-[0px]`}
                                >
                                    <div className="grid grid-cols-12 items-center">
                                        <div className="col-span-8 md:col-span-10 flex items-center space-x-3">
                                            {Icon && <Icon className="w-5 opacity-60 text-black dark:text-white" />}
                                            <span className="text-red line-clamp-1">{label}</span>
                                        </div>
                                        <div className="col-span-4 md:col-span-2 text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                            {latestQuestion?.attributes?.activeAt &&
                                                dayjs(latestQuestion.attributes.activeAt).fromNow()}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
            </li>
        </ul>
    )
}

export default TopicsTable

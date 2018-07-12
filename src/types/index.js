// @flow
export type LinkItem = {
	link: string,
	header: string,
	desc: string,
	icon: string
}

export type RouteItem = {
	title: string,
	path: string,
	exact?: boolean,
	strict?: boolean,
	tag: React$Node,
  // RR4 <Redirect /> doesn't have component property
	component?: React$Node,
	external?: boolean,
	meta: {
		icon?: string,
		name?: string,
		sidebarVisible?: boolean,
	}
}

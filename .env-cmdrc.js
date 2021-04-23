const commons = {
	REACT_APP_ENTITIES_FORMS_PATH: '/sites/default/libraries/cwrc-entity-management-forms-static/build/',
	REACT_APP_ENTITIES_BASE: 'islandora/cwrc_entities/v1',
	REACT_APP_ENTITIES_LOCK_TEMPLATE: 'islandora/rest/v1/objectlockstatus',
	REACT_APP_COLLECTIONS_BASE: 'islandora/get_entity_collections',
	REACT_APP_COLLECTIONS_COOKIE_BASE: 'cwrc-entity-collection',
};

//For buids, change package.json -> website to: "/sites/default/libraries/cwrc-entity-management-forms-static/build/"
module.exports = {
	production: {
		...commons,
		REACT_APP_ENTITIES_HOST: 'https://cwrc.ca',
	},
	staging: {
		...commons,
		REACT_APP_ENTITIES_HOST: 'https://staging-01.cwrc.ca',
	},
	testing: {
		...commons,
		REACT_APP_ENTITIES_HOST: 'https://test-01.cwrc.ca',
	},
	development: {
		...commons,
		REACT_APP_ENTITIES_HOST: 'https://dev-02.cwrc.ca',
		BUILD_PATH: 'foo', 
	},
	//for local dev, change package.json -> website to: "/""
	local: {
		REACT_APP_ENTITIES_HOST: 'http://localhost:3000',
		REACT_APP_ENTITIES_FORMS_PATH: '/',
		REACT_APP_ENTITIES_BASE: 'islandora/cwrc_entities/v1',
		REACT_APP_ENTITIES_LOCK_TEMPLATE: 'islandora/rest/v1/objectlockstatus',
		REACT_APP_COLLECTIONS_BASE: 'islandora/get_entity_collections',
		REACT_APP_COLLECTIONS_COOKIE_BASE: 'cwrc-entity-collection',
	},
};

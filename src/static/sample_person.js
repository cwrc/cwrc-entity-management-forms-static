export default {
	'identity': {
		'nameParts': [
			{
				'value': 'lastname',
				'type': 'sur name'
			},
			{
				'value': 'firstname',
				'type': 'forename'
			}
		],
		'standardName': 'lastname, firstname',
		'namePartsLang': 'eng',
		'variants': [
			{
				'parts': [
					{
						'value': 'cooldude',
						'type': 'role'
					}
				],
				'type': 'nickname',
				'lang': 'eng'
			}
		],
		'sameAs': [
			{
				'name': 'CoolDudes',
				'idno': 'http://www.wikidata.org/entity/Q52605911',
				'type': 'wikidata',
				'cert': 'medium'
			}
		]
	},
	'description': {
		'dates': [
			{
				'isRange': false,
				'date1': '2018-05-30T17:25:56.564Z',
				'qualifier1': 'when-iso',
				'type': 'floruit',
				'cert': 'high',
				'note': 'It\'stoday',
				'place': {
					'name': 'Hamilton,Ontario',
					'idno': 'http://dbpedia.org/resource/Hamilton,_Ontario',
					'type': 'dbpedia'
				}
			},
			{
				'isRange': true,
				'date1': '1980-11-08T05:00:00.000Z',
				'qualifier1': 'from-iso',
				'date2': '2018-01-01T05:00:00.000Z',
				'qualifier2': 'to-iso',
				'type': 'birth',
				'cert': 'medium'
			}
		],
		'properties': {
			'factuality': {
				'value': 'real',
				'cert': 'high'
			},
			'gender': [
				'cisgender',
				'cisman',
				'man'
			],
			'nationality': [
				{
					'value': 'Canadian',
					'cert': 'high'
				}
			],
			'occupation': [
				{
					'value': 'Webdeveloper',
					'cert': 'high'
				}
			]
		},
		'descriptiveNote': [
			{
				'lang': 'eng',
				'value': 'Agoodandcooldude'
			}
		],
		'projectNote': [
			{
				'project': 'smith',
				'lang': 'eng',
				'value': 'Workin'
			}
		]
	},
	'sources': {
		'bibl': [
			{
				'name': 'TheHamiltonSpectator',
				'idno': 'http://dbpedia.org/resource/The_Hamilton_Spectator',
				'type': 'dbpedia'
			}
		]
	}
}

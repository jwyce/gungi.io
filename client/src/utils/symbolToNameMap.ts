export const symbolToName = (symbol: string) => {
	switch (symbol) {
		case '小':
			return 'MAJOR GENERAL';
		case '中':
			return 'LIEUTENANT GENERAL';
		case '大':
			return 'GENERAL';
		case '弓':
			return 'ARCHER';
		case '馬':
			return 'KNIGHT';
		case '筒':
			return 'MUSKETEER';
		case '謀':
			return 'CAPTAIN';
		case '侍':
			return 'SAMURAI';
		case '砦':
			return 'FORTRESS';
		case '砲':
			return 'CANNON';
		case '忍':
			return 'SPY';
		case '兵':
			return 'PAWN';
		case '帥':
			return 'MARSHAL';
		default:
			return '';
	}
};

import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
	
	describe('setEntries', () => {
		
		it('dobavliaet zapisi k sostoianiu', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);
			
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
			
		});
		
		it('preobrazuet v immutable', () => {
			const state  = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});
	});
	
	describe('next', () => {
		
		it('beret dlia golosovania sleduiushie dve zapisi', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);
			
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
			
		});
		
		it('pomeshaet pobeditelia tekushego golosovania v konec spiska zapisei', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries:List.of('Sunshine', 'Millions', '127 Hours')
				
			});
			const nextState = next(state);
			
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127 Hours', 'Trainspotting')
			}));
			
		});
		
		it('v sluchae nichei pomeshaet obe zapisi v konec spiska', () => {
			const state = Map({
				vote:Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 3
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
			}));
		});
		
		it('kogda ostaetsa lish odna zapis, pomechaet ee kak pobeditelya', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = next(state);
			
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting'
			}));			
			
		});
		
	});
	
	describe('vote', () => {
		it('sozdaet rezultat golosovania dlya vybrannoi zapisi', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later')
			});
			const nextState = vote(state, 'Trainspotting');
			
			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 1
				})
			}));
		});
		
		it('dobavliaet v uje imeiushisya rezultat dlya vybrannoi zapisi', () => {
			
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 3,
					'28 Days Later': 2 
				})
			});
			const nextState  = vote(state, 'Trainspotting');
			
			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 4,
					'28 Days Later': 2
				})
			}));
		});
	});	
	
	
});













import { Mission, MissionPack } from '../../../types/game';

export const missions: Mission[] = [
  {
    id: 'only-war',
    name: 'Only War',
    missionPack: 'only-war',
    briefing: 'Control the battlefield through overwhelming force. Both armies fight for key positions, scoring points for holding objectives.',
    deploymentType: 'dawn-of-war',
    deploymentInstructions: 'Deploy armies using the Dawn of War deployment type. Players deploy from opposite table edges.',
    primaryObjective: {
      id: 'only-war-primary',
      name: 'Secure and Hold',
      description: 'Control objective markers to score victory points.',
      scoring: 'At the end of your Command Phase, if you control an objective marker, you score 1 Victory Point. If you control 2 or more objective markers, you score 2 Victory Points instead.',
    },
    secondaryOptions: [
      {
        id: 'only-war-sec-1',
        name: 'Behind Enemy Lines',
        description: 'At the end of your turn, if you control an objective marker that your opponent started the battle controlling, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'only-war-sec-2',
        name: 'No Prisoners',
        description: 'At the end of your Command Phase, for each enemy unit destroyed this turn, score 1 VP.',
        maxPoints: 10,
      },
      {
        id: 'only-war-sec-3',
        name: 'ENGAGE',
        description: 'At the end of each turn, if you have units within 6" of 3 or more table quarters, score 1 VP.',
        maxPoints: 10,
      },
    ],
  },
  {
    id: 'sweeping-engagement',
    name: 'Sweeping Engagement',
    missionPack: 'only-war',
    briefing: 'A fluid battle across multiple objectives. Control zones to gain victory.',
    deploymentType: 'hammer-and-anvil',
    deploymentInstructions: 'Deploy armies using the Hammer and Anvil deployment type. Player 1 deploys first.',
    primaryObjective: {
      id: 'sweeping-primary',
      name: 'Area Denial',
      description: 'Control zones to deny your opponent points.',
      scoring: 'At the end of your Command Phase, if you control your home objective marker, score 1 VP. If the enemy controls your home objective marker, they score 1 VP.',
    },
    secondaryOptions: [
      {
        id: 'sweeping-sec-1',
        name: 'Direct Assault',
        description: 'At the end of your Command Phase, if a Character enemy unit was destroyed this turn, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'sweeping-sec-2',
        name: 'Area Denial',
        description: 'At the end of your turn, if there are no enemy units within 6" of the center of the battlefield, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'sweeping-sec-3',
        name: 'Raze',
        description: 'At the end of your Command Phase, if there are no enemy models within 6" of an objective marker you control, score 1 VP.',
        maxPoints: 10,
      },
    ],
  },
  {
    id: 'vital-ground',
    name: 'Vital Ground',
    missionPack: 'only-war',
    briefing: 'Capture and hold the most strategically important positions on the battlefield.',
    deploymentType: 'crucible',
    deploymentInstructions: 'Deploy armies using the Crucible deployment type. Players deploy from opposite table edges with objective markers in the center.',
    primaryObjective: {
      id: 'vital-primary',
      name: 'Vital Ground',
      description: 'Control the most contested objectives.',
      scoring: 'At the end of your Command Phase, for each objective marker you control that your opponent also controls or that is contested, score 1 VP.',
    },
    secondaryOptions: [
      {
        id: 'vital-sec-1',
        name: 'ENGAGE',
        description: 'At the end of each turn, if you have units within 6" of 3 or more table quarters, score 1 VP.',
        maxPoints: 10,
      },
      {
        id: 'vital-sec-2',
        name: 'Shadow Operations',
        description: 'At the end of your Command Phase, if you control 2 or more objective markers, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'vital-sec-3',
        name: 'Overwhelming Force',
        description: 'At the end of your Command Phase, if you destroyed an enemy unit this turn, score 1 VP.',
        maxPoints: 10,
      },
    ],
  },
  {
    id: 'search-and-destroy',
    name: 'Search and Destroy',
    missionPack: 'only-war',
    briefing: 'Hunt down enemy forces while securing objectives.',
    deploymentType: 'search-and-destroy',
    deploymentInstructions: 'Deploy armies using Search and Destroy deployment. Players deploy from opposite corners.',
    primaryObjective: {
      id: 'search-primary',
      name: 'Hunt',
      description: 'Destroy enemy units and control objectives.',
      scoring: 'At the end of your Command Phase, if an enemy Character was destroyed this turn, score 2 VP. If you control an objective marker, score 1 VP.',
    },
    secondaryOptions: [
      {
        id: 'search-sec-1',
        name: 'Behind Enemy Lines',
        description: 'At the end of your turn, if you control an objective marker that your opponent started the battle controlling, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'search-sec-2',
        name: 'No Prisoners',
        description: 'At the end of your Command Phase, for each enemy unit destroyed this turn, score 1 VP.',
        maxPoints: 10,
      },
      {
        id: 'search-sec-3',
        name: 'ENGAGE',
        description: 'At the end of each turn, if you have units within 6" of 3 or more table quarters, score 1 VP.',
        maxPoints: 10,
      },
    ],
  },
  {
    id: 'scorched-earth',
    name: 'Scorched Earth',
    missionPack: 'only-war',
    briefing: 'Claim territory before your opponent can consolidate their position.',
    deploymentType: 'vanguard-strike',
    deploymentInstructions: 'Deploy armies using Vanguard Strike deployment. One player deploys first, the other deploys all reserves.',
    primaryObjective: {
      id: 'scorched-primary',
      name: 'Claim Territory',
      description: 'Control more objectives than your opponent.',
      scoring: 'At the end of your Command Phase, control objective markers to score. 1 marker: 1 VP, 2 markers: 2 VP, 3+ markers: 3 VP.',
    },
    secondaryOptions: [
      {
        id: 'scorched-sec-1',
        name: 'Direct Assault',
        description: 'At the end of your Command Phase, if a Character enemy unit was destroyed this turn, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'scorched-sec-2',
        name: 'Area Denial',
        description: 'At the end of your turn, if there are no enemy units within 6" of the center of the battlefield, score 2 VP.',
        maxPoints: 10,
      },
      {
        id: 'scorched-sec-3',
        name: 'Raze',
        description: 'At the end of your Command Phase, if there are no enemy models within 6" of an objective marker you control, score 1 VP.',
        maxPoints: 10,
      },
    ],
  },
];

export const combatPatrolMissions: Mission[] = [
  {
    id: 'clash-of-patrols',
    name: 'Clash of Patrols',
    missionPack: 'combat-patrol',
    briefing: 'A quick skirmish between Combat Patrols. Control the central objective to claim victory.',
    deploymentType: 'dawn-of-war',
    deploymentInstructions: 'Deploy armies in the deployment zones. Objective marker is placed at the center of the battlefield.',
    missionRule: 'BATTLELINE units can secure objective markers even if Battle-shocked.',
    primaryObjective: {
      id: 'clash-primary',
      name: 'Patrol Zone',
      description: 'Control the central objective marker.',
      scoring: 'At the end of your Command Phase, if you control the central objective, score 2 VP.',
    },
    secondaryOptions: [
      {
        id: 'clash-sec-1',
        name: 'First Blood',
        description: 'Score 1 VP if you destroyed an enemy unit first.',
        maxPoints: 5,
      },
      {
        id: 'clash-sec-2',
        name: 'Hold the Line',
        description: 'Score 1 VP if you control the objective at the end of the battle.',
        maxPoints: 5,
      },
    ],
  },
  {
    id: 'forward-outpost',
    name: 'Forward Outpost',
    missionPack: 'combat-patrol',
    briefing: 'Capture and hold the enemy\'s forward position.',
    deploymentType: 'hammer-and-anvil',
    deploymentInstructions: 'Deploy armies at opposite ends. Player 1 has a forward objective marker.',
    primaryObjective: {
      id: 'forward-primary',
      name: 'Forward Assault',
      description: 'Control objectives to score points.',
      scoring: 'At the end of your Command Phase, control your forward objective: 2 VP. Control your home objective: 1 VP.',
    },
    secondaryOptions: [
      {
        id: 'forward-sec-1',
        name: 'Quick Strike',
        description: 'Score 2 VP if you control the enemy\'s forward objective at the end of the battle.',
        maxPoints: 5,
      },
      {
        id: 'forward-sec-2',
        name: 'Defensive Position',
        description: 'Score 2 VP if your Warlord is alive at the end of the battle.',
        maxPoints: 5,
      },
    ],
  },
];

export const missionPacks: MissionPack[] = [
  {
    id: 'only-war',
    name: 'Only War',
    description: 'Core matched play mission pack for Warhammer 40,000 10th Edition.',
    missions: missions,
  },
  {
    id: 'combat-patrol',
    name: 'Combat Patrol',
    description: 'Simplified missions for Combat Patrol games.',
    missions: combatPatrolMissions,
  },
];

export const MISSIONS_BY_ID: Record<string, Mission> = Object.fromEntries(
  [...missions, ...combatPatrolMissions].map(m => [m.id, m])
);

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS_BY_ID[id];
}

export function getMissionsByPack(packId: string): Mission[] {
  return missions.filter(m => m.missionPack === packId);
}

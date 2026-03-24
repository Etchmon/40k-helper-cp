import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { missions } from '@/data/missions/only-war';
import { getMissionById } from '@/data/missions/only-war';
import { useState } from 'react';

interface MissionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function MissionStep({ onNext, onBack }: MissionStepProps) {
  const { state, dispatch } = useGame();
  const [selectedMissionId, setSelectedMissionId] = useState(state.settings.missionId);

  const handleSelectMission = (missionId: string) => {
    setSelectedMissionId(missionId);
    dispatch({ type: 'SET_MISSION', payload: missionId });
  };

  const handleToggleRandom = () => {
    dispatch({ type: 'SET_RANDOM_MISSION', payload: !state.settings.isRandomMission });
  };

  const selectedMission = getMissionById(selectedMissionId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text mb-2">Mission Briefing</h2>
        <p className="text-subtext0">Select your mission for this battle</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Select Mission</CardTitle>
              <CardDescription>
                Each mission has unique objectives and scoring rules
              </CardDescription>
            </div>
            <button
              onClick={handleToggleRandom}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                state.settings.isRandomMission
                  ? 'border-mauve bg-mauve/10'
                  : 'border-surface0 bg-surface0/50'
              }`}
            >
              <span className="text-sm">🎲 Random Mission</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {state.settings.isRandomMission ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎲</div>
              <p className="text-subtext0">
                Mission will be randomly selected when the battle begins.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map((mission) => (
                <button
                  key={mission.id}
                  onClick={() => handleSelectMission(mission.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedMissionId === mission.id
                      ? 'border-mauve bg-mauve/10'
                      : 'border-surface0 bg-surface0/50 hover:border-surface1'
                  }`}
                >
                  <div className="font-semibold text-text mb-1">{mission.name}</div>
                  <div className="text-sm text-subtext0 line-clamp-2">
                    {mission.briefing}
                  </div>
                  <div className="text-xs text-overlay0 mt-2">
                    {mission.missionPack.toUpperCase()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedMission && !state.settings.isRandomMission && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedMission.name}</CardTitle>
            <CardDescription>{selectedMission.briefing}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-text mb-2">Deployment</h4>
              <p className="text-sm text-subtext0">{selectedMission.deploymentInstructions}</p>
            </div>

            <div>
              <h4 className="font-semibold text-text mb-2">
                Primary Objective: {selectedMission.primaryObjective.name}
              </h4>
              <p className="text-sm text-subtext0 mb-2">
                {selectedMission.primaryObjective.description}
              </p>
              <div className="bg-surface0/50 rounded-lg p-3">
                <p className="text-sm text-text">{selectedMission.primaryObjective.scoring}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-text mb-2">Secondary Objectives</h4>
              <div className="space-y-2">
                {selectedMission.secondaryOptions.map((sec) => (
                  <div key={sec.id} className="bg-surface0/50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-text">{sec.name}</span>
                      <span className="text-sm text-mauve">Max {sec.maxPoints} pts</span>
                    </div>
                    <p className="text-sm text-subtext0">{sec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next: Review & Deploy
        </Button>
      </div>
    </div>
  );
}

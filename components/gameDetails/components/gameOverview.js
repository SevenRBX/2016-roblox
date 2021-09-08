import React from "react";
import { createUseStyles } from "react-jss";
import AuthenticationStore from "../../../stores/authentication";
import GearDropdown from "../../gearDropdown";
import GameDetailsStore from "../stores/gameDetailsStore";
import BuilderDetails from "./builderDetails";
import Description from "./description";
import GameStats from "./gameStats";
import GameThumbnails from "./gameThumbnails";
import PlayButton from "./playButton";

const useStyles = createUseStyles({
  gameTitle: {
    fontWeight: 700,
    fontSize: '30px',
    color: '#343434',
  },
})

const GameOverview = props => {
  const s = useStyles();
  const store = GameDetailsStore.useContainer();
  const auth = AuthenticationStore.useContainer();
  const showGear = store.details.creatorType === 'User' && store.details.creatorTargetId === auth.userId;

  return <div className='row'>
    <div className={showGear ? 'col-12 col-lg-10' : 'col-12'}>
      <h1 className={s.gameTitle}>{store.details.name}</h1>
    </div>
    {
      showGear && <div className='col-12 col-lg-2'>
        <GearDropdown options={
          [
            {
              name: 'Configure',
              url: `/places/${store.details.id}/update`,
            }
          ]
        }></GearDropdown>
      </div>
    }
    <div className='col-12 col-lg-8'>
      <GameThumbnails></GameThumbnails>
      <Description></Description>
    </div>
    <div className='col-12 col-lg-4'>
      <BuilderDetails creatorId={store.details.creatorTargetId} creatorName={store.details.creatorName} creatorType={store.details.creatorType}></BuilderDetails>
      <div className='divider-top mb-3'></div>
      <PlayButton placeId={store.details.id}></PlayButton>
      <GameStats></GameStats>
      <div className='divider-top mb-0'></div>
    </div>
  </div>
}

export default GameOverview;
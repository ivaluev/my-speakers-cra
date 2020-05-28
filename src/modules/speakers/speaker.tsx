import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Dispatch } from 'redux';
import { Speaker, Offset } from '../../data/speakers/types';
import { connect } from 'react-redux';
import { actionSpeakersSelect, actionSpeakersDelelect } from '../../data/speakers/actions';
import { RootState } from '../../data/store';
import { ModalContext } from '../../packages/modal/modal';
import SpeakerInfo from './speaker-info';
import ButtonCPlay from '../../packages/button-c-play';
import ButtonCMenu from '../../packages/button-c-menu';

type PropsSelected = {
  isSelected: boolean
}

type Props = {
  speaker: Speaker,
  tracksLength: number,
  isSelected: boolean,
  dispatch: Dispatch
}

function AppSpeaker({ speaker, tracksLength, isSelected, dispatch }: Props) {
  const { renderModalContent } = useContext(ModalContext);
  const { coord } = speaker;

  function toggleSpeakerSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const isShiftPressed = e.shiftKey;

    isSelected
      ? dispatch(actionSpeakersDelelect([speaker.id]))
      : dispatch(actionSpeakersSelect([speaker.id], isShiftPressed));
  }

  function openModal() {
    renderModalContent(<SpeakerInfo speaker={speaker} />);
  }

  function play() {
    alert('playing');
  }

  return (
    <AppSpeakerWrapper
      w={coord[0]}
      h={coord[1]}
    >
      <AppSpeakerCounter isSelected={isSelected}
        onClick={toggleSpeakerSelection}
      >
        {tracksLength}
      </AppSpeakerCounter>
      {isSelected && <ButtonPlayPositioned onClick={play} />}
      {isSelected && <ButtonMenuPositioned onClick={openModal} />}
    </AppSpeakerWrapper>
  );
}

const mapStateToProps = (state: RootState, ownProps: Pick<Props, 'speaker'>) => ({
  isSelected: state.speakers.speakersSelected.includes(ownProps.speaker.id),
  tracksLength: state.speakers.speakers[ownProps.speaker.id].tracks.length
});

export default connect(mapStateToProps)(AppSpeaker);

const ButtonPlayPositioned = styled(ButtonCPlay)`
  position: absolute;
  top: -15px;
  left: -15px;
`;

const ButtonMenuPositioned = styled(ButtonCMenu)`
  position: absolute;
  top: -15px;
  right: -15px;
`;

const AppSpeakerWrapper = styled.div<Offset>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${props => props.h}px;
  left: ${props => props.w}px;
  width: 100px;
  height: 100px;
`;

const AppSpeakerCounter = styled.div<PropsSelected>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  background-color: hotpink;
  background-color: ${props => props.isSelected ? 'blue' : 'inital'};
  &:hover {
    cursor: pointer;
    background-color: blue;
  }
`;
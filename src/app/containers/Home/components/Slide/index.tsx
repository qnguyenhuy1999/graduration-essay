import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { Box, Link, Span } from 'app/components';
import { IconWrapper } from 'app/components/Icon';
import { Edit, Trash } from 'app/components/Icon/Common';
import { actions } from '../../slice';
import { actions as trashActions } from 'app/containers/Trash/slice';

export function Slide(props) {
  const { name, id, setInfoModalCUSlide } = props;
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();

  return (
    <Link to={`/slide/${id}/editor`} mr="m">
      <Box
        variant="default"
        p="m"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="position-relative"
      >
        <Span variant="body" fontWeight="bold">
          {name}
        </Span>
        {isHover && (
          <div>
            <EditIconStyled
              icon={Edit}
              size="tiny"
              fill="primaryBlue"
              onClick={e => {
                e.preventDefault();
                setInfoModalCUSlide({ isVisible: true, data: { id, name } });
              }}
            />
            <TrashIconStyled
              icon={Trash}
              size="tiny"
              fill="redPigment"
              onClick={e => {
                e.preventDefault();
                dispatch(actions.removeSlide(id));
              }}
            />
          </div>
        )}
      </Box>
    </Link>
  );
}

export function TrashSlide(props) {
  const { name, id } = props;
  const dispatch = useDispatch();
  return (
    <Box
      variant="default"
      p="m"
      mr="m"
      className="position-relative cursor-pointer"
      onClick={() => dispatch(trashActions.reOpenSlide(id))}
    >
      <Span variant="body" fontWeight="bold">
        {name}
      </Span>
    </Box>
  );
}

const TrashIconStyled = styled(IconWrapper)`
  position: absolute;
  top: -12px;
  right: -5px;
`;

const EditIconStyled = styled(IconWrapper)`
  position: absolute;
  top: -12px;
  left: -5px;
`;

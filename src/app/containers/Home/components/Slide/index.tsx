import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { Box, Button, Link, Span } from 'app/components';
import { actions } from '../../slice';
import { actions as trashActions } from 'app/containers/Trash/slice';
import { ConfirmModalDeleteSlide } from '../ConfirmModalDeleteSlide';
import { selectHome } from '../../selectors';

export function Slide(props) {
  const { name, id, index, setInfoModalCUSlide } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const dispatch = useDispatch();
  const { removeSlideResult } = useSelector(selectHome);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  useEffect(() => {
    if (removeSlideResult) {
      handleCloseModal();
    }
  }, [removeSlideResult]);

  return (
    <div className="col-3">
      <Link to={`/slide/${id}/editor`} mr="m">
        <Box
          variant="default"
          boxShadow="0 2px 4px rgba(0, 0, 0, .5)"
          borderRadius="4px"
          className="position-relative overflow-hidden w-100"
        >
          <img
            src={`https://loremflickr.com/600/400?random=${index}`}
            alt="slide"
            loading="lazy"
            onLoad={() => setIsLoadedImage(true)}
            style={!isLoadedImage ? { display: 'none' } : {}}
          />
          {!isLoadedImage && <Skeleton width={335} height={224} />}
          <div className="px-3 py-4">
            <Span variant="body" fontWeight="bold">
              {name}
            </Span>
            <div className="mt-3">
              <Button
                variant="primary"
                mr="m"
                onClick={e => {
                  e.preventDefault();
                  setInfoModalCUSlide({ isVisible: true, data: { id, name } });
                }}
              >
                Edit
              </Button>
              <Button
                variant="warning"
                onClick={e => {
                  e.preventDefault();
                  setIsVisibleModal(true);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Link>
      <ConfirmModalDeleteSlide
        isVisible={isVisibleModal}
        handleClose={handleCloseModal}
        handleAccept={() => dispatch(actions.removeSlide(id))}
      />
    </div>
  );
}

export function TrashSlide(props) {
  const { name, id, index } = props;
  const dispatch = useDispatch();
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  return (
    <div className="col-3">
      <Box
        variant="default"
        boxShadow="0 2px 4px rgba(0, 0, 0, .5)"
        borderRadius="4px"
        className="position-relative overflow-hidden w-100"
      >
        <img
          src={`https://loremflickr.com/600/400?random=${index}`}
          alt="slide"
          loading="lazy"
          onLoad={() => setIsLoadedImage(true)}
          style={!isLoadedImage ? { display: 'none' } : {}}
        />
        {!isLoadedImage && <Skeleton width={335} height={224} />}
        <div className="px-3 py-4">
          <Span variant="body" fontWeight="bold">
            {name}
          </Span>
          <div className="mt-3">
            <Button
              variant="primary"
              mr="m"
              onClick={() => dispatch(trashActions.reOpenSlide(id))}
            >
              Re-open slide
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

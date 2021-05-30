import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from 'app/components';
import { EditElementFormValues, Element } from 'types/element';

interface Props {
  updateContentElement: (payload) => void;
  element: Element;
  visible: boolean;
  handleClose: () => void;
}

interface FormProps extends FormikProps<EditElementFormValues> {
  handleClose: () => void;
  element: Element;
}

interface FormFormikProps {
  updateContentElement: (payload) => void;
  contentElement: string;
  element: Element;
  handleClose: () => void;
}

const EDITOR_HEIGHT = '500px';

export function EditElementModal(props: Props) {
  const { updateContentElement, element, visible, handleClose } = props;
  const [contentElement, setContentElement] = useState(
    EditorState.createEmpty(),
  );

  useEffect(() => {
    const contentBlock = htmlToDraft(element?.html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setContentElement(editorState);
    }
  }, [element.html]);

  return (
    <Modal
      title={'Edit element'}
      visible={visible}
      width={'1000px'}
      handleClose={handleClose}
      className={'modal-center'}
    >
      <EditElementFormik
        contentElement={contentElement}
        element={element}
        updateContentElement={updateContentElement}
        handleClose={handleClose}
      />
    </Modal>
  );
}

function EditElementForm(props: FormProps) {
  const {
    values,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
    handleClose,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <FormWrapperStyled>
        <FormGroup mt="s">
          <FormLabel htmlFor="caption">Caption</FormLabel>
          <FormControl
            name="caption"
            id="caption"
            value={values.caption}
            onChange={e => setFieldValue('caption', e.target.value)}
          />
        </FormGroup>

        <EditorStyled height={EDITOR_HEIGHT}>
          <Editor
            editorState={values.html}
            toolbarClassName="editor-toolbar"
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={html => {
              setFieldValue('html', html);
            }}
          />
        </EditorStyled>

        <div>
          <Flex alignItems="center" mb="m">
            <FormGroup mr="m" width="100%">
              <FormLabel htmlFor="top">Top</FormLabel>
              <FormControl
                name="top"
                id="top"
                value={values.content?.top.caption}
                onChange={e =>
                  setFieldValue('content.top.caption', e.target.value)
                }
                disabled={values.content?.top.linkId === 'empty'}
              />
            </FormGroup>
            <FormGroup width="100%">
              <FormLabel htmlFor="right">Right</FormLabel>
              <FormControl
                name="right"
                id="right"
                value={values.content?.right.caption}
                onChange={e =>
                  setFieldValue('content.right.caption', e.target.value)
                }
                disabled={values.content?.right.linkId === 'empty'}
              />
            </FormGroup>
          </Flex>
          <Flex alignItems="center" mb="m">
            <FormGroup mr="m" width="100%">
              <FormLabel htmlFor="bottom">Bottom</FormLabel>
              <FormControl
                name="bottom"
                id="bottom"
                value={values.content?.bottom.caption}
                onChange={e =>
                  setFieldValue('content.bottom.caption', e.target.value)
                }
                disabled={values.content?.bottom.linkId === 'empty'}
                mr="m"
              />
            </FormGroup>
            <FormGroup width="100%">
              <FormLabel htmlFor="left">Left</FormLabel>
              <FormControl
                name="left"
                id="left"
                value={values.content?.left.caption}
                onChange={e =>
                  setFieldValue('content.left.caption', e.target.value)
                }
                disabled={values.content?.left.linkId === 'empty'}
              />
            </FormGroup>
          </Flex>
        </div>
      </FormWrapperStyled>

      <div className="mt-4">
        <Button
          type="submit"
          variant="primary"
          mr="m"
          disabled={!(isValid && dirty)}
        >
          Update
        </Button>
        <Button type="button" variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

const EditElementFormik = withFormik<FormFormikProps, EditElementFormValues>({
  mapPropsToValues: ({ element, contentElement }) => {
    const nodeTop = element.nodes.find(node => node.nodeNumber === 1);
    const nodeRight = element.nodes.find(node => node.nodeNumber === 2);
    const nodeBottom = element.nodes.find(node => node.nodeNumber === 3);
    const nodeLeft = element.nodes.find(node => node.nodeNumber === 4);
    return {
      caption: element.caption,
      html: contentElement,
      content: {
        top: {
          id: nodeTop?.id || '',
          caption: nodeTop?.caption || '',
          linkId: nodeTop?.linkId,
        },
        right: {
          id: nodeRight?.id || '',
          caption: nodeRight?.caption || '',
          linkId: nodeRight?.linkId,
        },
        bottom: {
          id: nodeBottom?.id || '',
          caption: nodeBottom?.caption || '',
          linkId: nodeBottom?.linkId,
        },
        left: {
          id: nodeLeft?.id || '',
          caption: nodeLeft?.caption || '',
          linkId: nodeLeft?.linkId,
        },
      },
    };
  },
  validationSchema: Yup.object().shape({
    caption: Yup.mixed().required(),
    html: Yup.mixed().required(),
    content: Yup.object().shape({
      top: Yup.mixed().required(),
      right: Yup.mixed().required(),
      bottom: Yup.mixed().required(),
      left: Yup.mixed().required(),
    }),
  }),
  handleSubmit: (values, { props }) => {
    const nodes = [
      { id: values.content?.top.id, caption: values.content?.top.caption },
      { id: values.content?.right.id, caption: values.content?.right.caption },
      {
        id: values.content?.bottom.id,
        caption: values.content?.bottom.caption,
      },
      { id: values.content?.left.id, caption: values.content?.left.caption },
    ];
    const data = {
      caption: values.caption,
      html: draftToHtml(convertToRaw(values.html.getCurrentContent())),
      nodes,
    };
    props.updateContentElement(data);
  },
})(EditElementForm);

const EditorStyled = styled(Box)<any>`
  margin-bottom: ${props => props.theme.space.xxl};
  .editor {
    height: calc(${EDITOR_HEIGHT} - 70px);
  }
`;

const FormWrapperStyled = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
`;

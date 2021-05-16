import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import { Box, Button, Flex, FormControl, Modal } from 'app/components';
import { EditElementFormValues, Element } from 'types/element';

interface Props {
  updateContentElement: (payload) => void;
  element: Element;
  visible: boolean;
  handleClose: () => void;
}

interface FormProps extends FormikProps<EditElementFormValues> {
  handleClose: () => void;
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

        <Flex className="align-items-center justify-content-center flex-wrap">
          <FormControl
            name="top"
            value={values.content?.top.caption}
            onChange={e => setFieldValue('content.top.caption', e.target.value)}
          />
          <FormControl
            name="right"
            value={values.content?.right.caption}
            onChange={e =>
              setFieldValue('content.right.caption', e.target.value)
            }
          />
          <FormControl
            name="bottom"
            value={values.content?.bottom.caption}
            onChange={e =>
              setFieldValue('content.bottom.caption', e.target.value)
            }
          />
          <FormControl
            name="left"
            value={values.content?.left.caption}
            onChange={e =>
              setFieldValue('content.left.caption', e.target.value)
            }
          />
        </Flex>
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
      html: contentElement,
      content: {
        top: { id: nodeTop?.id || '', caption: nodeTop?.caption || '' },
        right: { id: nodeRight?.id || '', caption: nodeRight?.caption || '' },
        bottom: {
          id: nodeBottom?.id || '',
          caption: nodeBottom?.caption || '',
        },
        left: {
          id: nodeLeft?.id || '',
          caption: nodeLeft?.caption || '',
        },
      },
    };
  },
  validationSchema: Yup.object().shape({
    html: Yup.mixed().required(),
    content: Yup.object().shape({
      top: Yup.mixed().required(),
      right: Yup.mixed().required(),
      bottom: Yup.mixed().required(),
      left: Yup.mixed().required(),
    }),
  }),
  handleSubmit: (values, { props }) => {
    const data = {
      html: draftToHtml(convertToRaw(values.html.getCurrentContent())),
      nodes: [
        values.content?.top,
        values.content?.right,
        values.content?.bottom,
        values.content?.left,
      ],
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

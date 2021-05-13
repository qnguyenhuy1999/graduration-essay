import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Box, Button, Modal } from 'app/components';
import styled from '@emotion/styled';

interface Props {
  html: string;
  handleChangeHTML: (data) => void;
  visible: boolean;
  handleClose: () => void;
}

const EDITOR_HEIGHT = '500px';

export function EditElementModal(props: Props) {
  const { html, handleChangeHTML, visible, handleClose } = props;
  const [content, setContent] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setContent(editorState);
    }
  }, [html]);

  console.log(draftToHtml(convertToRaw(content.getCurrentContent())));

  return (
    <Modal
      title={'Edit element'}
      visible={visible}
      width={'80vh'}
      handleClose={handleClose}
      className={'modal-center'}
    >
      <EditorStyled height={EDITOR_HEIGHT}>
        <Editor
          editorState={content}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          onEditorStateChange={html => {
            setContent(html);
            handleChangeHTML(html);
          }}
        />
      </EditorStyled>

      <div className="mt-4">
        <Button variant="primary" mr="m">
          Update
        </Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </Modal>
  );
}

const EditorStyled = styled(Box)`
  .editor {
    height: calc(${EDITOR_HEIGHT} - 70px);
  }
`;

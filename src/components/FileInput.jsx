import React, { useCallback, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

import ImageIcon from '@mui/icons-material/Image';


function FileInput({ files, setFiles }) {
  const [isHovering, setIsHovering] = useState(false)

  const addFile = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const new_files = event.target.files ? [...event.target.files] : [...event.dataTransfer.files]

      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      const filesToUpload = new_files.filter(new_file => validImageTypes.includes(new_file.type) && !files.some((file) => file.name === new_file.name))

      setFiles([...files, ...filesToUpload])

      setIsHovering(false)
    },
    [files, setFiles]
  )

  const preventEvents = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  )

  const startAnim = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsHovering(!isHovering)
    },
    [isHovering],
  )


  return (
    <FileContainer
      onDrop={event => addFile(event)}
      onDragOver={event => preventEvents(event)}
      onDragEnter={event => startAnim(event)}
      onDragLeave={event => startAnim(event)}
    >
      <IconContainer isHovering={isHovering}>
        <ImageIcon sx={{ margin: "0 auto", padding: "10px" }}></ImageIcon>
      </IconContainer>
      <Desc>Sem presunte fotky</Desc>
      <DescSecondary>alebo</DescSecondary>
      <StyledFileInput
        type="file"
        multiple
        onChange={addFile}
        accept="image/png, image/gif, image/jpeg"
        id="files" />
      <Label htmlFor="files" onChange={addFile} accept="image/png, image/gif, image/jpeg">Vyberte súbory</Label>
    </FileContainer>
  )
}

export default FileInput

const shake = keyframes`
  0%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  ${props => props.isHovering && css`    
    animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    animation-iteration-count: infinite;
  `};
`;

const Label = styled.label`
  margin: 0px auto;
  width: max-content;
  color: black;
  display: block;
  font-size: 1em;
  border: 2px solid black;
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  transition: all ease-in-out 250ms;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const DescSecondary = styled.div`
  text-align: center;
  padding: 20px 0px;
`;

const Desc = styled.div`
  font-weight: 600;
  text-align: center;
`;

const FileContainer = styled.div`
  border: 1px solid black;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px dotted #c6c6c6;
  border-radius: 10px;

  ${props => props.validation && `  
    border: 1px dotted ${props.validation};
  `};
`;

const StyledFileInput = styled.input`
  content: "";    
  display: none;
`;

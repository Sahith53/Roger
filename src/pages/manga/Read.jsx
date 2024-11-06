import React from 'react'
import { useParams } from 'react-router-dom'
import ReadManga from '../../components/manga/Details/ChapterImages'
const Read = () => {
    const { id, chapterId } = useParams()
  return (
    <div>
        <ReadManga chapterId={chapterId} imageQuality="hq" />
    </div>
  )
}

export default Read
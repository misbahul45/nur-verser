'use client'
import React, { useState } from 'react'

const SuratDescription=({
    deskripsi
}:{ deskripsi:string }) => {
  const [showMore, setShowMore] = useState(false)
  const maxLength = 200;
  const descriptionText = deskripsi || "";
  
  const isLongDescription = descriptionText.length > maxLength

  const displayText = showMore || !isLongDescription 
    ? descriptionText 
    : `${descriptionText.slice(0, maxLength)}...`

  return (
    <div className="max-w-4xl mx-auto">
        <div className="prose lg:prose-xl prose text-center prose-invert max-w-none text-white/90">
            <div 
              dangerouslySetInnerHTML={{ __html: displayText }} 
            />
            {isLongDescription && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showMore ? 'Show Less' : 'Show More'}
              </button>
            )}
        </div>
    </div>
  )
}

export default SuratDescription
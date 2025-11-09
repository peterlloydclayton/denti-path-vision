import React from 'react';

interface MessageContentProps {
  text: string;
  isUser: boolean;
}

export const MessageContent: React.FC<MessageContentProps> = ({ text, isUser }) => {
  // URL detection regex
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Process the text line by line
  const lines = text.split('\n');
  
  const processLine = (line: string, index: number) => {
    // Check if line is a bullet point
    const bulletMatch = line.match(/^[\s]*[-*•]\s+(.+)$/);
    if (bulletMatch) {
      return (
        <li key={index} className="ml-4">
          {processInlineContent(bulletMatch[1])}
        </li>
      );
    }
    
    // Check if line is a numbered list
    const numberMatch = line.match(/^[\s]*(\d+)\.\s+(.+)$/);
    if (numberMatch) {
      return (
        <li key={index} className="ml-4 list-decimal">
          {processInlineContent(numberMatch[2])}
        </li>
      );
    }
    
    // Regular line with content
    if (line.trim()) {
      return (
        <p key={index} className="mb-2 last:mb-0">
          {processInlineContent(line)}
        </p>
      );
    }
    
    // Empty line creates spacing
    return <div key={index} className="h-2" />;
  };
  
  const processInlineContent = (content: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Process bold text **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let combinedRegex = new RegExp(`(${urlRegex.source})|(${boldRegex.source})`, 'g');
    
    let match;
    while ((match = combinedRegex.exec(content)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      
      // Check if it's a URL
      if (match[1]) {
        parts.push(
          <a
            key={match.index}
            href={match[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:opacity-80 transition-opacity font-medium"
          >
            {match[1]}
          </a>
        );
      }
      // Check if it's bold text
      else if (match[2]) {
        const boldText = match[2].replace(/\*\*/g, '');
        parts.push(
          <strong key={match.index} className="font-bold">
            {boldText}
          </strong>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : content;
  };
  
  const processedLines = lines.map((line, index) => processLine(line, index));
  
  // Group consecutive list items
  const groupedContent: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let listType: 'bullet' | 'numbered' | null = null;
  
  processedLines.forEach((element, index) => {
    if (React.isValidElement(element) && element.type === 'li') {
      const props = element.props as { className?: string };
      const isBullet = !props.className?.includes('list-decimal');
      const currentType = isBullet ? 'bullet' : 'numbered';
      
      if (listType === null) {
        listType = currentType;
      }
      
      if (listType === currentType) {
        currentList.push(element);
      } else {
        // Different list type, flush current list
        if (currentList.length > 0) {
          groupedContent.push(
            listType === 'bullet' ? (
              <ul key={`list-${groupedContent.length}`} className="list-disc mb-2">
                {currentList}
              </ul>
            ) : (
              <ol key={`list-${groupedContent.length}`} className="list-decimal mb-2">
                {currentList}
              </ol>
            )
          );
        }
        currentList = [element];
        listType = currentType;
      }
    } else {
      // Not a list item, flush current list if any
      if (currentList.length > 0) {
        groupedContent.push(
          listType === 'bullet' ? (
            <ul key={`list-${groupedContent.length}`} className="list-disc mb-2">
              {currentList}
            </ul>
          ) : (
            <ol key={`list-${groupedContent.length}`} className="list-decimal mb-2">
              {currentList}
            </ol>
          )
        );
        currentList = [];
        listType = null;
      }
      groupedContent.push(element);
    }
  });
  
  // Flush any remaining list
  if (currentList.length > 0) {
    groupedContent.push(
      listType === 'bullet' ? (
        <ul key={`list-${groupedContent.length}`} className="list-disc mb-2">
          {currentList}
        </ul>
      ) : (
        <ol key={`list-${groupedContent.length}`} className="list-decimal mb-2">
          {currentList}
        </ol>
      )
    );
  }
  
  return <div className="text-sm text-white">{groupedContent}</div>;
};

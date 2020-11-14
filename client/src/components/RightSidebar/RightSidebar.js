import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './RightSidebar.css';

function RightSidebar({
  selected,
  handleExpandClick,
  authorDict,
  toggleSelected,
  handleSidebarAuthorRedirect,
}) {
  const [details, setDetails] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      let selectedDetails = authorDict[selected];
      setDetails(selectedDetails);
      setOpen(true);
    }
  }, [selected]);

  const clickHandler = () => {
    handleExpandClick();
  };

  const toggleSidebar = () => {
    toggleSelected();
    setOpen(false);
  };

  const renderList = () => {
    return selected && details['articles'];
  };

  const handleAuthorClick = () => {
    handleSidebarAuthorRedirect(selected);
  };

  return (
    <div className={`rsb-container ${open ? 'show' : 'hide'}`}>
      <div className="rsb-icon">
        <FontAwesomeIcon
          icon={faTimes}
          className="rsb-icon-close icon"
          onClick={toggleSidebar}
        />
      </div>
      <div className="rsb-details">
        <div className="rsb-author" onClick={handleAuthorClick}>
          <Link className="rsb-author" to="/list">
            {selected}
          </Link>
        </div>
        <div className="rsb-collabs">
          # of collaborators:
          {renderList() ? details['collabs'].length : 0}
        </div>
      </div>
      <div className="rsb-list">
        {renderList()
          ? details.articles.map((ar) => {
              return (
                <div key={ar.id} className="rsb-list-article">
                  <div className="rsb-article-title">{ar.title}</div>
                  <div className="rsb-article-authors">
                    {ar.author.map((au) => au.name).join(', ')}
                  </div>
                  <div className="rsb-article-published">
                    {dayjs(ar.published[0]).format('MMM YYYY')}
                  </div>
                </div>
              );
            })
          : 'No articles to display'}
      </div>
      <button type="submit" className="rsb-expand-btn" onClick={clickHandler}>
        Expand graph
      </button>
    </div>
  );
}

export default RightSidebar;

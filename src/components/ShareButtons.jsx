// components/ShareButtons.js
import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';

const ShareButtons = ({ url, title }) => {
    return (
        <>
            <h3>Podijelite na:</h3>
            <div className="share-buttons">
                <FacebookShareButton url={url} quote={title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={url} title={title}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
        </>
    );
};

export default ShareButtons;

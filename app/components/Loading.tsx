import React from 'react';

interface LoadingProps {
    value?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ value = true }) => {
    if (!value) return null;

    return (
        <div className="spinner-box fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center z-40 bg-opacity-60 backdrop-blur-sm">
            <div className="pulse-container relative z-50">
                <div className="pulse-bubble pulse-bubble-1 bg-primary"></div>
                <div className="pulse-bubble pulse-bubble-2 bg-primary"></div>
                <div className="pulse-bubble pulse-bubble-3 bg-primary"></div>
            </div>
        </div>
    );
};

export default Loading;

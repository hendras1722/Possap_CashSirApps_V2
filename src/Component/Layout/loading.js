import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ContactSkeletonLoading = () => {
    return (
        <div style={{ width: "180px", height: "320px", backgroundColor: "white", marginTop: "50px", marginLeft: "30px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", borderRadius: "15px", display: 'inline' }}>
            <div className="text-container" style={{ marginTop: 0 }} key={0}>
                <div className="text-container" style={{ marginLeft: 20 }}>
                    <Skeleton width={145} height={145} duration={1} />
                </div>
                <div className="text-container">
                    <div style={{ marginLeft: 5 }}>
                        <Skeleton width={110} height={15} duration={1} />
                    </div>
                    <div style={{ marginLeft: "115px", marginTop: -5 }}>
                        <Skeleton width={40} height={8} duration={1} />
                    </div>
                    <div className="text-container" style={{ marginTop: 5, marginLeft: 15 }}>
                        <Skeleton width={40} height={20} duration={1} />
                    </div>
                    <div className="text-container" style={{ marginTop: 20, marginLeft: 20 }}>
                        <Skeleton width={115} height={20} duration={1} />
                    </div>

                    <div className="text-container" style={{ marginTop: 8, marginLeft: 8 }}>
                        <Skeleton width={140} height={30} duration={1} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSkeletonLoading;
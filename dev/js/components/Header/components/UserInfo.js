import React, {PropTypes} from 'react';
import './user-info.scss';

const UserInfo = (props) => {
	const count = props.notifications ? props.notifications.length : false;

  return (
		<div className="UserInfo">

				<button className="UserInfo-notifications">
					{
						count &&
						<span className="UserInfo-notifications-count">
							{count}
						</span>
					}
				</button>


			<strong className="UserInfo-name">
				{props.userName}
			</strong>
		</div>
  );
};

UserInfo.propTypes = {
	image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  notifications: PropTypes.array
};

export default UserInfo;

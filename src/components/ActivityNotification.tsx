interface ActivityNotificationProps {
  notification: string;
}

const ActivityNotification: React.FC<ActivityNotificationProps> = ({ notification }) => {
  return (
    <div className='bg-[#1b5a71] px-2 py-2 text-[12px] font-semibold rounded-3xl text-center'>
      {notification}
    </div>
  );
};

export default ActivityNotification;

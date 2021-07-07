const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuvo dia</p>
        <p className="journal__entry-content">
          excepturi ad modi corporis saepe porro similique
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Lunes</span>
        <h4>28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;

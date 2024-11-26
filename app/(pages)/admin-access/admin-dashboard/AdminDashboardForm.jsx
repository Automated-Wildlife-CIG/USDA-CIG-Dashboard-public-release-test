const ManageDevice = () => {
  return (
    <>
      <div>Admin Dashboard Page</div>
      <p>
        This page will be for admin. They can access any users dashboard to see
        any errors. This page will be the same as Dashboard accept the admin
        will have a dropdown that gets user markers by id. The API will need to
        be updated to change how page loads as it will first need a user ID and
        first name.
      </p>
      <p>
        This page will only be seen by an admin where user_profile field "admin"
        is true.
      </p>
    </>
  );
};

export default ManageDevice;

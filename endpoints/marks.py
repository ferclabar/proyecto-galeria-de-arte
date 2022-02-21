from silence.decorators import endpoint


@endpoint(
    route="/marks/$photoId",
    method="GET",
    sql="SELECT AVG(mark) rate FROM Marks WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/marks",
    method="POST",
    sql="INSERT INTO Marks (userId, photoId, mark) VALUES ($userId, $photoId, $mark)",
    description="Creates a new mark",
    auth_required=False,
)
def create(userId, photoId, mark):
    pass

###############################################################################

@endpoint(
    route="/marks/$userId/$photoId",
    method="PUT",
    sql="UPDATE Marks SET mark = $mark WHERE userId = $userId and photoId = $photoId",
    description="Updates an existing photo",
    auth_required=False,
)
def update(mark):
    pass

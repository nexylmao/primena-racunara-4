# member
member(X, [X | _]).
member(X, [_ | R]) :- member(X, R).

# takeout
takeout(X, [X | R], R).
takeout(X, [F | R], [F | S]) :- takeout(X, R, S).

# append
append([], X, X).
append([X | Y], Z, [X | W]) :- append(Y, Z, W).

# reverse
reverse([ ], X, X).
reverse([X | Y], Z, W) :- reverse(Y, [X | Z], W).
reverse(A, R) :- reverse(A, [ ], R).

# subset
subset([ ], _).
subset([X | R], S) :- member(X, S), subset(R, S).

# union
union([ ], Z, Z).
union([X | Y], Z, W) :- member(X, Z), union(Y, Z, W).
union([X | Y], Z, [X | W]) :- \+ member(X, Z), union(Y, Z, W).
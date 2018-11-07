# signum 

sgn(X, S) :- X > 0, S is 1, !.
sgn(X, S) :- X < 0, S is -1, !.
sgn(X, S) :- X = 0, S is 0.

# minimum/maximum 

min(X, Y, X) :- X=<Y, !.
min(_, Y, Y).
max(X, Y, Y) :- X=<Y, !.
max(X, _, X).

# faktorijel

faktorijel(0, 1) :- !.
faktorijel(X, F) :- X1 is X - 1, faktorijel(X1, F1), F is F1 * X.

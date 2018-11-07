member(X, [X | _]).
member(X, [_ | R]) :- member(X, R).

takeout(X, [X | R], R).
takeout(X, [F | R], [F | S]) :- takeout(X, R, S).

append([], X, X).
append([X | Y], Z, [X | W]) :- append(Y, Z, W).

reverse([ ], X, X).
reverse([X | Y], Z, W) :- reverse(Y, [X | Z], W).
reverse(A, R) :- reverse(A, [ ], R).

subset([ ], _).
subset([X | R], S) :- member(X, S), subset(R, S).

union([ ], Z, Z).
union([X | Y], Z, W) :- member(X, Z), union(Y, Z, W).
union([X | Y], Z, [X | W]) :- \+ member(X, Z), union(Y, Z, W).

intersection([ ], _, [ ]).
intersection([X | Y], M, [X | Z]) :- member(X, M), intersection(Y, M, Z).
intersection([X | Y], M, Z) :- \+ member(X, M), intersection(Y, M, Z).

split([ ], [ ], [ ]).
split([A], [A], [ ]).
split([A, B | R], [A | Ra], [B | Rb]) :- split(R, Ra, Rb).

merge(A, [ ], A).
merge([] , B, B).
merge([A | Ra], [B | Rb], [A | M]) :- A =< B, merge(Ra, [B | Rb], M).
merge([A | Ra], [B | Rb], [B | M]) :- A > B, merge([A | Ra], Rb, M).

insert(X, [], [X]).
insert(X, [Y | T], [X, Y | T]) :- X =< Y.
insert(X, [Y | T], [Y | Z]) :- X > Y, insert(X, T, Z).

partition([], _, [], []).
partition([X | T], Y, [X | L], R) :- X =< Y, partition(T, Y, L, R).
partition([X | T], Y, L, [X | R]) :- X > Y, partition(T, Y, L, R).
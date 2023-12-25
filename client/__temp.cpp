// 356807GC
#include <iostream>
#include <vector>
#include <array>
#include <string>
#include <algorithm>
#include <cmath>
#include <utility>
#include <map>
#include <set>
#include <unordered_map>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <tuple>
#include <stack>
#include <queue>
using namespace std;

/* ----- type alias ----- */
using ll = long long;
template <typename T, typename U>
using umap = std::unordered_map<T, U>;
using vi  = vector<int>;
using vl  = vector<ll>;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using vii = vector<pii>;
using vll = vector<pll>;
using vvi = vector<vi>;
using vb  = vector<bool>;

/* ----- macros ----- */
#define all(v) (v).begin(), (v).end()
#define rall(v) (v).rbegin(), (v).rend()
#define MOD 1000000007ll
#define INF (1 << 30)
#define INF_L (1ll << 60)
#define optimize() std::ios_base::sync_with_stdio(false);\
                   cin.tie(nullptr); cout.tie(nullptr)
#define LEN(s) (int)(s).length()
#define SIZE(V) (int)(V).size()
#define DEC_MOD(N, DEC, MOD) (((N) - (DEC) + (MOD)) % (MOD))
#define INC_MOD(N, INC, MOD) (((N) + (INC)) % MOD)
#define FLOOR(N, M) (((N) - (M) + 1) / (M))
#define CEIL(N, M) (((N) + (M) - 1) / (M))
#define ROUND_F(N) (int)((double)N + 0.5)
#define PRINT(A, END) cerr << #A << ": " << A << END

/* ----- utility variables, arrays, vectors ----- */
int dr[] = { -1,  0, 0, 1 };
int dc[] = {  0, -1, 1, 0 };

void solve() {
    int n; cin >> n;
    vi v(n); for (int &i: v) cin >> i;
    int ans = 0;
    for (int i = 1; i < n; ++i) ans = max(ans, v[i] - v[0] + 1);
    cout << ans;
}

int main(void) {
    optimize();
    int t = 1;
    //cin >> t;
    //int tc = 1;
    while (t--) {
        //cout << "Case " << tc++ << ": ";
        solve();
        cout << '\n';
    }


